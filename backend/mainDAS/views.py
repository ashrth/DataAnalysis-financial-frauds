from rest_framework import status, viewsets
import csv
import os
import pickle
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404
from mainDAS.serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from mainDAS.bankserver import BankServerView
from django.conf import settings
from django.http import HttpResponse
from twilio.rest import Client


# Analysing transactions:
class TransactionAnalyzer:
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]

    def preprocess(self, transaction):

        # Assuming json to be the dummy transaction
        d = {
            'LX': 2, 'auto': 3, 'apparel': 4, 'deal': 5, 'recrea': 6,
            'entertainment': 7, 'gift card': 8, 'fastfood': 9, 'gas': 10,
            'internet': 13, 'international': 14, 'fashion': 15, 'electronic': 16, 'health': 17
        }

        input = [0 for _ in range(29)]

        input[0] = transaction['available_credit']
        input[1] = transaction['amount']

        input[d[transaction['transaction_category']]] = 1

        if transaction['day'] > 15:
            input[21] = 1
        if int(transaction['time'][0:2]) <= 7:
            input[22] = 1
        elif int(transaction['time'][0:2]) <= 15:
            input[23] = 1
        else:
            input[24] = 1

        if transaction['payment_failed']:
            input[25] = 1
        if transaction['forget_password']:
            input[26] = 1
        if transaction['KYC_incomplete']:
            input[27] = 1
        if transaction['multiple_accounts']:
            input[28] = 1

        return [input]

    def analyze_transaction(self, transaction):
        current_directory = os.path.dirname(os.path.abspath(__file__))
        pickle_file_path = os.path.join(current_directory, 'model_pickle')

        try:
            with open(pickle_file_path, 'rb') as fileobj:
                best_model_RF_3_3 = pickle.load(fileobj)
                # preprocessing
                preprocess_transaction = self.preprocess(transaction)
                print(preprocess_transaction)

                # analyzing
                result = best_model_RF_3_3.predict(preprocess_transaction)

                # returning result
                if result[0] == 1:
                    return 1
                else:
                    return 0
        except FileNotFoundError:
            print(f"Error: Model file not found at the path.")
        except Exception as e:
            print(f"Error loading the model: {e}")


# Process CSV and sending row to model:
transaction_analyzer = TransactionAnalyzer()


class CSVProcessor(APIView):
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        if request.method == 'POST':
            uploaded_file = request.FILES['csv_file']

            try:
                decoded_file = uploaded_file.read().decode('utf-8').splitlines()
                fraud_count = 0

                for transaction in csv.DictReader(decoded_file):
                    # send the row to model

                    transaction['available_credit'] = float(
                        transaction['available_credit'])
                    transaction['amount'] = float(transaction['amount'])
                    transaction['day'] = int(transaction['day'])
                    transaction['payment_failed'] = bool(
                        transaction['payment_failed'])
                    transaction['forget_password'] = bool(
                        transaction['forget_password'])
                    transaction['KYC_incomplete'] = bool(
                        transaction['KYC_incomplete'])
                    transaction['multiple_accounts'] = bool(
                        transaction['multiple_accounts'])
                    print(transaction)

                    analyze_data = transaction_analyzer.analyze_transaction(
                        transaction)

                    # store in db if fraud
                    if analyze_data == 1:
                        flagged_acc_obj = FlaggedAccount.objects.create(
                            account_number=transaction['account_number'],
                            available_credit=transaction['available_credit'],
                            amount=float(transaction['amount']),
                            KYC_incomplete=transaction['KYC_incomplete'],
                            multiple_accounts=transaction['multiple_accounts'],
                            transaction_category=transaction['transaction_category'])

                        flagged_acc_obj.save()
                        fraud_count += 1
                        return Response({'message': f'Predictions have been stored. {fraud_count} frauds detected.'}, status=status.HTTP_201_CREATED)
                    else:

                        return Response(
                            {"message": "CSV was processed, and no frauds were deteced."},
                        )

            except Exception as e:
                return Response(
                    {"error": f"Error processing the CSV file: {str(e)}"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        return Response(
            {"message": "Please upload a CSV file."},
        )


class RealTimeTransactionProcessor(APIView):
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        if request.method == 'POST':
            bank_server_instance = BankServerView()
            transaction = bank_server_instance.generate_dummy_transaction()
            print(transaction, "here")

            try:
                analyze_data = transaction_analyzer.analyze_transaction(
                    transaction)

                # store in db if fraud
                if analyze_data == 1:
                    flagged_acc_obj = FlaggedAccount.objects.create(
                        account_number=transaction['account_number'],
                        available_credit=transaction['available_credit'],
                        amount=float(transaction['amount']),
                        KYC_incomplete=transaction['KYC_incomplete'],
                        multiple_accounts=transaction['multiple_accounts'],
                        transaction_category=transaction['transaction_category'])
                    flagged_acc_obj.save()
                    return Response({'message': 'Prediction has been stored.'}, status=status.HTTP_201_CREATED)

                else:
                    return Response(
                        {"message": "No fraud found in real time transactions."},
                    )

            except Exception as e:
                return Response(
                    {"error": f"Error processing the transactions: {str(e)}"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        return Response(
            {"message": "Please wait for the upcoming transactions."},
        )


class TicketIssuer(viewsets.ViewSet):
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]

    def list(self, request):
        queryset = FraudAlert.objects.all()
        serializer = ViewTicketSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request):
        data = request.data
        serializer = CreateTicketSerializer(data=request.data)
        if serializer.is_valid():
            serializer.create(data)
            return Response({'message': 'Ticket issued succesfully'},)
        return Response({'message': 'There was an error with ticket creation'}, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        queryset = FraudAlert.objects.all()
        ticket = get_object_or_404(queryset, pk=pk)
        serializer = ViewTicketSerializer(ticket)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, pk=None):
        ticket = FraudAlert.objects.get(pk=pk)
        serializer = UpdateTicketSerializer(instance=ticket, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Ticket updated successfully'},
                            status=status.HTTP_200_OK)

        return Response({'message': 'Updating failed'}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        ticket = get_object_or_404(FraudAlert, pk=pk)
        ticket.delete()
        return Response({'message': 'Ticket deleted successfully.'})


class FlaggedAccountView(APIView):
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]

    def list(self, request):
        queryset = FlaggedAccount.objects.all()
        serializer = FlaggedAccountSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)





class Broadcast(APIView):
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            data = request.data

            serializer = BroadcastMessageSerializer(data=data)
            if serializer.is_valid():
                message_to_broadcast = serializer.validated_data['content']
                print(message_to_broadcast)

                account_sid = os.environ.get('TWILIO_SID')
                print(account_sid)
                auth_token = os.environ.get('TWILIO_TOKEN')
                client = Client(account_sid, auth_token)
                for recipient in settings.SMS_BROADCAST_TO_NUMBERS:
                    if recipient:
                        print(recipient)
                        client.messages.create(to=recipient,
                                               from_=os.environ.get(
                                                   'TWILIO_NUMBER'),
                                               body=message_to_broadcast)
                    return Response({"message": "messages sent!"}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": f"Error sending the braodcast message: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST,
            )

from rest_framework import status, viewsets
import csv
import joblib
import os
from pathlib import Path
import pickle
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404
from mainDAS.serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response


# Analysing transactions:
class TransactionAnalyzer:
    # authentication_classes=[JWTAuthentication]
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
        if transaction['multiple_accounts'] >= 4:
            input[28] = 1

        return [[input]]

    def analyze_transaction(self, transaction):

        # sys.modules['final_model'] = final_model

        try:
            with open('./model/model_pickle', 'rb') as fileobj:
                best_model_RF_3_3 = pickle.load(fileobj)
                # preprocessing
                preprocess_transaction = self.preprocess(transaction)
                # analyzing
                result = best_model_RF_3_3.predict(preprocess_transaction)
                # returning result
                if result == 1:
                    return result
                else:
                    return Response({'message': 'No fraud found.'})
        except FileNotFoundError:
            print(f"Error: Model file not found at the path.")
        except Exception as e:
            print(f"Error loading the model: {e}")


# Process CSV and sending row to model:
transaction_analyzer = TransactionAnalyzer()


class CSVProcessor(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        if request.method == 'POST':
            uploaded_file = request.FILES['csv_file']

            try:
                decoded_file = uploaded_file.read().decode('utf-8').splitlines()

                for transaction in csv.DictReader(decoded_file):
                    # send the row to model
                    analyze_data = transaction_analyzer.analyze_transaction(
                        transaction)
                    # store in db if fraud
                    if analyze_data:
                        flagged_acc_obj = FlaggedAccount.objects.create(
                            account_number=analyze_data['account'],
                            available_credit=analyze_data['available_credit'],
                            amount=float(analyze_data['amount']),
                            KYC_incomplete=analyze_data['KYC_incomplete'],
                            multiple_accounts=analyze_data['multiple_accounts'],
                            transaction_category=analyze_data['transaction_category'])

                        flagged_acc_obj.save()
                        return Response({'message': 'Prediction has been stored.'}, status=status.HTTP_201_CREATED)

                return Response(
                    {"message": "CSV file has been processed successfully!"},
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
    # authentication_classes=[JWTAuthentication]
    # permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        if request.method == 'POST':
            transaction = request.data
            print(transaction, "here")

            try:
                analyze_data = transaction_analyzer.analyze_transaction(
                    transaction)
                # store in db if fraud
                if analyze_data:
                    flagged_acc_obj = FlaggedAccount.objects.create(
                        account_number=analyze_data['account'],
                        available_credit=analyze_data['available_credit'],
                        amount=float(analyze_data['amount']),
                        KYC_incomplete=analyze_data['KYC_incomplete'],
                        multiple_accounts=analyze_data['multiple_accounts'],
                        transaction_category=analyze_data['transaction_category'])
                    flagged_acc_obj.save()
                    return Response({'message': 'Prediction has been stored.'}, status=status.HTTP_201_CREATED)

                # return Response(
                #     {"message": "No fraud found in real time transactions."},
                # )

            except Exception as e:
                return Response(
                    {"error": f"Error processing the transactions: {str(e)}"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        return Response(
            {"message": "Please wait for the upcoming transactions."},
        )


class TicketIssuer(viewsets.ViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

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

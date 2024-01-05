from rest_framework import status, viewsets
import csv
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from mainDAS.serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response


# Analysing transactions:
class TransactionAnalyzer(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    def analyze_transaction():
        pass


# Process CSV and sending row to model:
transaction_analyzer = TransactionAnalyzer


class CSVProcessor(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    def process_csv(request):
        if request.method == 'POST':
            uploaded_file = request.FILES['csv_file']

            try:
                decoded_file = uploaded_file.read().decode('utf-8').splitlines()

                for transaction in csv.DictReader(decoded_file):
                    # send the row to model
                    analyze_data = transaction_analyzer.analyze_transaction(
                        transaction)
                    # store in db if fraud

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


class TicketIssuer(viewsets.ViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

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

from rest_framework import status
import csv
from rest_framework.response import Response


# Analysing transactions:
def analyze_transaction():
    pass

# Process CSV and sending row to model:

def process_csv(request):
    if request.method == 'POST':
        uploaded_file = request.FILES['csv_file']


        try:
            decoded_file = uploaded_file.read().decode('utf-8').splitlines()

            for transaction in csv.DictReader(decoded_file):
                # send the row to model
                analyze_data = analyze_transaction(transaction)
                
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


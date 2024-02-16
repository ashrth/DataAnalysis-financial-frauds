# import pandas as pd
# import random
# from datetime import datetime, timedelta

# # Function to generate random date within a range
# def random_date(start_date, end_date):
#     return start_date + timedelta(seconds=random.randint(0, int((end_date - start_date).total_seconds())))

# # Set the seed for reproducibility
# random.seed(42)

# # Number of records
# num_records = 20


# # Generate random data for the specified columns
# data = {
#     'account_number': [f'7687379{random.randint(1, 9)}' for i in range(1, num_records + 1)],
#     'available_credit': [random.uniform(1000, 10000) for _ in range(num_records)],
#     'date_flagged': [random_date(datetime(2022, 1, 1), datetime(2024, 1, 1)) for _ in range(num_records)],
#     'amount': [random.uniform(10, 1000) for _ in range(num_records)],
#     'KYC_incomplete': [random.choice([True, False]) for _ in range(num_records)],
#     'multiple_accounts': [random.choice([True, False]) for _ in range(num_records)],
#     'transaction_category': [random.choice(["LX", "auto", "internet", "recrea", "entertainment", "gas", "fashion", "international", "health", "electronic", "gift card", "deal", "apparel", "fastfood"]) for _ in range(num_records)]
# }

# # Create a DataFrame
# df = pd.DataFrame(data)

# # Save to Excel file
# excel_filename = 'random_data.xlsx'
# df.to_excel(excel_filename, index=False, engine='openpyxl')

# print(f"Excel file '{excel_filename}' created successfully.")


import csv
import random

# Example CSV generation
csv_file_path = 'test_transactions_5.csv'


def generate_dummy_transaction():
    return {
        'account_number': f'1234{random.randint(1000, 9999)}',
        'available_credit': round(random.uniform(100.0, 5000.0), 2),
        'amount': round(random.uniform(10.0, 1000.0), 2),
        'transaction_category': random.choice(['LX', 'auto', 'internet', 'recrea', 'entertainment', 'gas', 'fashion', 'international', 'health', 'electronic', 'gift card', 'deal', 'apparel', 'fastfood']),
        'day': random.randint(1, 31),
        'time': f'{random.randint(0, 23):02d}:{random.randint(0, 59):02d}:{random.randint(0, 59):02d}',
        'payment_failed': random.choice([True, False]),
        'forget_password': random.choice([True, False]),
        'KYC_incomplete': random.choice([True, False]),
        'multiple_accounts': random.choice([True, False]),
    }


# Generate CSV file
with open(csv_file_path, mode='w', newline='') as csv_file:
    fieldnames = ['account_number', 'available_credit', 'amount', 'transaction_category',
                  'day', 'time', 'payment_failed', 'forget_password', 'KYC_incomplete', 'multiple_accounts']
    writer = csv.DictWriter(csv_file, fieldnames=fieldnames)

    writer.writeheader()
    for _ in range(169):
        transaction = generate_dummy_transaction()
        writer.writerow(transaction)

from mainDAS.views import *
from django.urls import path

urlpatterns = [
    path('process-csv', CSVProcessor.as_view(), name='process-csv'),
    path('analyze-transaction', TransactionAnalyzer.as_view(),
         name='analyze-transaction'),
   

]

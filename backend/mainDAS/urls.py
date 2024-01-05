from mainDAS.views import *
from django.urls import path

urlpatterns = [
    path('process-csv', CSVProcessor.as_view(), name='process-csv'),
    path('analyze-transaction', TransactionAnalyzer.as_view(),
         name='analyze-transaction'),
    path('ticket', TicketIssuer.as_view(
        {'get': 'list', 'post': 'create'}), name='ticket'),
    path('ticket-actions/<int:pk>', TicketIssuer.as_view(
        {'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='ticket-actions'),



]

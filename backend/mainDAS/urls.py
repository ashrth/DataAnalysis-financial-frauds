from mainDAS.views import *
from django.urls import path
from mainDAS.bankserver import BankServerView

urlpatterns = [
    path('process-csv/', CSVProcessor.as_view(), name='process-csv'),
    # path('analyze-transaction/', TransactionAnalyzer.as_view(),
    #      name='analyze-transaction'),
    path('process-real-time-transactions/', RealTimeTransactionProcessor.as_view(),
         name='process-real-time-transactions'),
    path('bank-server/', BankServerView.as_view(), name='bank-server'),
    path('ticket/', TicketIssuer.as_view(
        {'get': 'list', 'post': 'create'}), name='ticket'),
    path('ticket-actions/<int:pk>/', TicketIssuer.as_view(
        {'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='ticket-actions'),
    path('view-flagged-accounts/', FlaggedAccountView.as_view(),
         name='view-flagged-accounts'),
    path('send-broadcast-message/', Broadcast.as_view(),
         name='send-broadcast-message')



]

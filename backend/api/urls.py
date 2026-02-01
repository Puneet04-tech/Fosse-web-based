from django.urls import path
from .views import UploadDatasetView, DesktopUploadDatasetView, DatasetListView, DatasetDetailView, DatasetReportPDFView, DatasetDataView, create_users_view

urlpatterns = [
    path('upload/', UploadDatasetView.as_view(), name='upload-dataset'),  # Web - requires auth
    path('desktop-upload/', DesktopUploadDatasetView.as_view(), name='desktop-upload-dataset'),  # Desktop - no auth
    path('datasets/', DatasetListView.as_view(), name='dataset-list'),
    path('datasets/<int:pk>/', DatasetDetailView.as_view(), name='dataset-detail'),
    path('datasets/<int:pk>/data/', DatasetDataView.as_view(), name='dataset-data'),
    path('datasets/<int:pk>/report.pdf', DatasetReportPDFView.as_view(), name='dataset-report'),
    path('create-users/', create_users_view, name='create-users'),
]

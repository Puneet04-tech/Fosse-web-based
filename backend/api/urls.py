from django.urls import path
from .views import UploadDatasetView, DesktopUploadDatasetView, DatasetListView, DatasetDetailView, DatasetReportPDFView, DatasetDataView, create_users_view, CreateUsersView
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def api_root(request):
    """
    API Root - FOSSEE Equipment Monitoring System
    """
    return Response({
        'message': 'FOSSEE Equipment Monitoring System API',
        'version': '1.0.0',
        'endpoints': {
            'upload': '/api/upload/',
            'desktop_upload': '/api/desktop-upload/',
            'datasets': '/api/datasets/',
            'create_users': '/api/create-users/',
            'test': '/api/test/',
        },
        'status': 'operational'
    })

@api_view(['GET'])
def test_endpoint(request):
    """
    Test endpoint to verify API is working
    """
    return Response({
        'message': 'API is working!',
        'cors': 'CORS headers should be present',
        'timestamp': '2026-02-01T19:25:00Z'
    })

urlpatterns = [
    path('', api_root, name='api-root'),
    path('test/', test_endpoint, name='test-endpoint'),
    path('upload/', UploadDatasetView.as_view(), name='upload-dataset'),  # Web - requires auth
    path('desktop-upload/', DesktopUploadDatasetView.as_view(), name='desktop-upload-dataset'),  # Desktop - no auth
    path('datasets/', DatasetListView.as_view(), name='dataset-list'),
    path('datasets/<int:pk>/', DatasetDetailView.as_view(), name='dataset-detail'),
    path('datasets/<int:pk>/data/', DatasetDataView.as_view(), name='dataset-data'),
    path('datasets/<int:pk>/report.pdf', DatasetReportPDFView.as_view(), name='dataset-report'),
    path('create-users/', CreateUsersView.as_view(), name='create-users'),
]

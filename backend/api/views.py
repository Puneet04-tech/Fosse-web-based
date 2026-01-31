import io
import pandas as pd
import numpy as np
from django.http import JsonResponse, HttpResponse, FileResponse
from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Dataset
from .serializers import DatasetSerializer
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas


class UploadDatasetView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]  # RESTORED authentication for web

    def post(self, request, format=None):
        file_obj = request.FILES.get('file')
        if not file_obj:
            return JsonResponse({'error': 'No file uploaded'}, status=400)

        # Read CSV into pandas
        try:
            df = pd.read_csv(file_obj)
        except Exception as e:
            return JsonResponse({'error': f'Could not parse CSV: {str(e)}'}, status=400)

        MAX_ROWS = 50000
        if len(df) > MAX_ROWS:
            df = df.sample(n=MAX_ROWS, random_state=42).reset_index(drop=True)

        total_count = len(df)
        numeric_cols = ['Flowrate', 'Pressure', 'Temperature']
        averages = {}
        for col in numeric_cols:
            if col in df.columns:
                averages[col] = float(df[col].dropna().astype(float).mean())
            else:
                averages[col] = None

        anomalies = {}
        for col in numeric_cols:
            if col in df.columns:
                data = df[col].dropna().astype(float)
                if len(data) > 0:
                    mean = data.mean()
                    std = data.std()
                    if std > 0:
                        z_scores = np.abs((data - mean) / std)
                        anomaly_count = (z_scores > 3).sum()  # Z-score > 3 as anomaly
                        anomalies[col] = int(anomaly_count)
                    else:
                        anomalies[col] = 0
                else:
                    anomalies[col] = 0
            else:
                anomalies[col] = 0

        type_dist = df['Type'].value_counts().to_dict() if 'Type' in df.columns else {}

        summary = {
            'total_count': total_count,
            'averages': averages,
            'anomalies': anomalies,
            'type_distribution': type_dist,
        }

        try:
            ds = Dataset.objects.create(file=file_obj, summary=summary)

            keep = Dataset.objects.order_by('-uploaded_at')[:5]
            keep_ids = [d.id for d in keep]
            old = Dataset.objects.exclude(id__in=keep_ids)
            for o in old:
                try:
                    o.file.delete(save=False)
                except Exception:
                    pass
                o.delete()

            serializer = DatasetSerializer(ds)
            return JsonResponse(serializer.data, status=201)
        except Exception as e:
            import logging
            logger = logging.getLogger(__name__)
            logger.exception('Error saving uploaded dataset')
            return JsonResponse({'error': 'Internal server error', 'details': str(e)}, status=500)


class DesktopUploadDatasetView(APIView):
    """Special upload endpoint for desktop app without authentication"""
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [AllowAny]  # NO authentication for desktop

    def post(self, request, format=None):
        file_obj = request.FILES.get('file')
        if not file_obj:
            return JsonResponse({'error': 'No file uploaded'}, status=400)

        # Read CSV into pandas
        try:
            df = pd.read_csv(file_obj)
        except Exception as e:
            return JsonResponse({'error': f'Could not parse CSV: {str(e)}'}, status=400)

        MAX_ROWS = 50000
        if len(df) > MAX_ROWS:
            df = df.sample(n=MAX_ROWS, random_state=42).reset_index(drop=True)

        total_count = len(df)
        numeric_cols = ['Flowrate', 'Pressure', 'Temperature']
        averages = {}
        for col in numeric_cols:
            if col in df.columns:
                averages[col] = float(df[col].dropna().astype(float).mean())
            else:
                averages[col] = None

        anomalies = {}
        for col in numeric_cols:
            if col in df.columns:
                data = df[col].dropna().astype(float)
                if len(data) > 0:
                    mean = data.mean()
                    std = data.std()
                    if std > 0:
                        z_scores = np.abs((data - mean) / std)
                        anomaly_count = (z_scores > 3).sum()  # Z-score > 3 as anomaly
                        anomalies[col] = int(anomaly_count)
                    else:
                        anomalies[col] = 0
                else:
                    anomalies[col] = 0
            else:
                anomalies[col] = 0

        type_dist = df['Type'].value_counts().to_dict() if 'Type' in df.columns else {}

        summary = {
            'total_count': total_count,
            'averages': averages,
            'anomalies': anomalies,
            'type_distribution': type_dist,
        }

        try:
            ds = Dataset.objects.create(file=file_obj, summary=summary)

            keep = Dataset.objects.order_by('-uploaded_at')[:5]
            keep_ids = [d.id for d in keep]
            old = Dataset.objects.exclude(id__in=keep_ids)
            for o in old:
                try:
                    o.file.delete(save=False)
                except Exception:
                    pass
                o.delete()

            serializer = DatasetSerializer(ds)
            return JsonResponse(serializer.data, status=201)
        except Exception as e:
            import logging
            logger = logging.getLogger(__name__)
            logger.exception('Error saving uploaded dataset')
            return JsonResponse({'error': 'Internal server error', 'details': str(e)}, status=500)


class DatasetListView(generics.ListAPIView):
    queryset = Dataset.objects.order_by('-uploaded_at')[:5]
    serializer_class = DatasetSerializer
    permission_classes = [AllowAny]


class DatasetDetailView(generics.RetrieveAPIView):
    queryset = Dataset.objects.all()
    serializer_class = DatasetSerializer
    permission_classes = [AllowAny]


class DatasetReportPDFView(APIView):
    permission_classes = [IsAuthenticated]  # RESTORED authentication for web

    def get(self, request, pk, format=None):
        try:
            ds = Dataset.objects.get(pk=pk)
        except Dataset.DoesNotExist:
            return JsonResponse({'error': 'Dataset not found'}, status=404)

        buffer = io.BytesIO()
        p = canvas.Canvas(buffer, pagesize=letter)
        p.setFont('Helvetica-Bold', 16)
        p.drawString(72, 720, 'Chemical Equipment Dataset Report')
        p.setFont('Helvetica', 12)
        p.drawString(72, 700, f'Dataset ID: {ds.id}')
        p.drawString(72, 685, f'Uploaded at: {ds.uploaded_at.isoformat()}')

        y = 660
        p.drawString(72, y, 'Summary:')
        y -= 18
        for k, v in (ds.summary or {}).items():
            p.drawString(84, y, f'{k}: {v}')
            y -= 16
            if y < 72:
                p.showPage()
                y = 720

        p.showPage()
        p.save()
        buffer.seek(0)
        return FileResponse(buffer, as_attachment=True, filename=f'dataset_{ds.id}_report.pdf')


class DatasetDataView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk, format=None):
        try:
            ds = Dataset.objects.get(pk=pk)
        except Dataset.DoesNotExist:
            return JsonResponse({'error': 'Dataset not found'}, status=404)

        try:
            df = pd.read_csv(ds.file.path)
        except Exception as e:
            return JsonResponse({'error': f'Could not read dataset file: {str(e)}'}, status=500)

        records = df.to_dict(orient='records')
        return JsonResponse({'rows': records}, status=200)

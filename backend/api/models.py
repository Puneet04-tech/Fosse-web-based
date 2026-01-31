from django.db import models
from django.utils import timezone


class Dataset(models.Model):
    file = models.FileField(upload_to='datasets/')
    uploaded_at = models.DateTimeField(default=timezone.now)
    summary = models.JSONField(blank=True, null=True)

    def __str__(self):
        return f"Dataset {self.id} @ {self.uploaded_at.isoformat()}"

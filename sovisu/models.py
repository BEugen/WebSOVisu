from django.db import models
from django.utils import timezone


class Weather(models.Model):
    wth_date = models.DateTimeField(default=timezone.now())
    T = models.FloatField()
    Po = models.FloatField()
    P = models.FloatField()
    U = models.FloatField()
    ff10 = models.FloatField()
    ff3 = models.FloatField()
    Td = models.FloatField()
    RRR = models.FloatField()
    Wg = models.FloatField()

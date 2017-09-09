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


class AnalizatorData(models.Model):
    an_date = models.DateTimeField(default=timezone.now())
    so_m = models.FloatField()
    so_n = models.FloatField()
    so_ug = models.FloatField()
    so_n_date = models.DateTimeField(default=timezone.now())
    so_m_date = models.DateTimeField(default=timezone.now())
    so_ug_date = models.DateTimeField(default=timezone.now())
    so_m_nr = models.IntegerField()
    so_n_nr = models.IntegerField()
    so_ug_nr = models.IntegerField()
    so_m_nr_v = models.FloatField()
    so_n_nr_v = models.FloatField()
    so_ug_nr_v = models.FloatField()
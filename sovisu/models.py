from django.db import models
from django.utils import timezone
from django.db.models.functions import Coalesce


class Weather(models.Model):
    wth_date = models.DateTimeField()
    T = models.FloatField()
    Po = models.FloatField()
    P = models.FloatField()
    U = models.FloatField()
    ff10 = models.FloatField()
    ff3 = models.FloatField()
    Td = models.FloatField()
    RRR = models.FloatField()
    Wg = models.FloatField()

    def getrow(self, date):
        return self.objects.filter(wth_date__lte=date).order_by(Coalesce('wth_date').desc()).first()


class AnalizatorData(models.Model):
    an_date = models.DateTimeField()
    so_m = models.FloatField()
    so_n = models.FloatField()
    so_ug = models.FloatField()
    so_n_date = models.DateTimeField()
    so_m_date = models.DateTimeField()
    so_ug_date = models.DateTimeField()
    so_m_nr = models.IntegerField()
    so_n_nr = models.IntegerField()
    so_ug_nr = models.IntegerField()
    so_m_nr_v = models.FloatField()
    so_n_nr_v = models.FloatField()
    so_ug_nr_v = models.FloatField()

    def getrow(self, date):
        return self.objects.filter(an_date__lte=date).order_by(Coalesce('an_date').desc()).first()

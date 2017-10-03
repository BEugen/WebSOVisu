from django.db import models
from django.utils import timezone
from django.db.models.functions import Coalesce
import calendar
from datetime import timedelta

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


class InSqlData(models.Model):
    an_date = models.DateTimeField()
    c4_q = models.FloatField()
    c5_q = models.FloatField()
    c6_q = models.FloatField()
    c7_q = models.FloatField()
    c8_q = models.FloatField()
    so2_m = models.FloatField()
    so2_n = models.FloatField()
    so2_ug = models.FloatField()
    rtp = models.IntegerField()


class DataChart(object):
    def data_chart(self, cid):
        end_date = timezone.now()
        st_date = end_date + timedelta(hours=-8)
        sql_val = AnalizatorData.objects.filter(an_date__range=(st_date, end_date)).order_by('-an_date').all().values()
        print(timezone.now())
        template = [{'label': '', 'color': '#218EFF', 'data': []},
                    {'label': 'Нейросеть', 'color': '#42A831', 'data': [], 'lines': {'steps': True}},
                    {'label': 'Предупреждение', 'color': '#F2691F', 'data': [], 'lines': {'lineWidth': 1.2}},
                    {'label': 'Превышение ПДК', 'color': '#f20010', 'data': [], 'lines': {'lineWidth': 1.2}},
                    ]
        if cid == 0:
            mc = 0
            template[0]['label'] = 'УГМС'
            for x in sql_val:
                if x['an_date'].minute % 5 == 0 and x['an_date'].minute != mc:
                    mc = x['an_date'].minute
                    self.make_chart_data(template[0]['data'], x['an_date'], x['so_ug'])
                    self.make_chart_data_nn(template[1]['data'], x['an_date'], x['so_ug_nr'])
                    self.make_chart_data(template[2]['data'], x['an_date'], 0.3)
                    self.make_chart_data(template[3]['data'], x['an_date'], 0.5)
            return template

        if cid == 1:
            mc = 0
            template[0]['label'] = 'Нагорное'
            for x in sql_val:
                if x['an_date'].minute % 5 == 0 and x['an_date'].minute != mc:
                    mc = x['an_date'].minute
                    self.make_chart_data(template[0]['data'], x['an_date'], x['so_n'])
                    self.make_chart_data_nn(template[1]['data'], x['an_date'], x['so_n_nr'])
                    self.make_chart_data(template[2]['data'], x['an_date'], 0.3)
                    self.make_chart_data(template[3]['data'], x['an_date'], 0.5)
            return template

        if cid == 2:
            mc = 0
            template[0]['label'] = 'Молодежная'
            for x in sql_val:
                if x['an_date'].minute % 5 == 0 and x['an_date'].minute != mc:
                    mc = x['an_date'].minute
                    self.make_chart_data(template[0]['data'], x['an_date'], x['so_m'])
                    self.make_chart_data_nn(template[1]['data'], x['an_date'], x['so_m_nr'])
                    self.make_chart_data(template[2]['data'], x['an_date'], 0.3)
                    self.make_chart_data(template[3]['data'], x['an_date'], 0.5)
            return template

    def make_chart_data(self, data, dt, val):
        return data.append([self.make_datetime(dt), val])

    def make_chart_data_nn(self, data, dt, val):
        nn = 0.0
        if val == 0:
            nn = 0.15
        if val == 1:
            nn = 0.4
        if val == 2:
            nn = 0.6
        return data.append([self.make_datetime(dt), nn])

    def make_datetime(self, dt):
        return calendar.timegm(dt.timetuple()) * 1000

# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-09-09 19:01
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AnalizatorData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('an_date', models.DateTimeField(default=datetime.datetime(2017, 9, 9, 19, 1, 31, 882607, tzinfo=utc))),
                ('so_m', models.FloatField()),
                ('so_n', models.FloatField()),
                ('so_ug', models.FloatField()),
                ('so_n_date', models.DateTimeField(default=datetime.datetime(2017, 9, 9, 19, 1, 31, 882692, tzinfo=utc))),
                ('so_m_date', models.DateTimeField(default=datetime.datetime(2017, 9, 9, 19, 1, 31, 882722, tzinfo=utc))),
                ('so_ug_date', models.DateTimeField(default=datetime.datetime(2017, 9, 9, 19, 1, 31, 882752, tzinfo=utc))),
                ('so_m_nr', models.IntegerField()),
                ('so_n_nr', models.IntegerField()),
                ('so_ug_nr', models.IntegerField()),
                ('so_m_nr_v', models.FloatField()),
                ('so_n_nr_v', models.FloatField()),
                ('so_ug_nr_v', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Weather',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('wth_date', models.DateTimeField(default=datetime.datetime(2017, 9, 9, 19, 1, 31, 882007, tzinfo=utc))),
                ('T', models.FloatField()),
                ('Po', models.FloatField()),
                ('P', models.FloatField()),
                ('U', models.FloatField()),
                ('ff10', models.FloatField()),
                ('ff3', models.FloatField()),
                ('Td', models.FloatField()),
                ('RRR', models.FloatField()),
                ('Wg', models.FloatField()),
            ],
        ),
    ]

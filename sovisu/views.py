from django.shortcuts import render, redirect, HttpResponse, render_to_response, HttpResponseRedirect
from django.contrib.auth import authenticate, login
import json
import datetime
from django.utils import timezone
from sovisu.models import AnalizatorData, DataChart
from django.db.models.functions import Coalesce

DataForChart = DataChart()

def visu_so(request):
    return render(request, 'sovisu/visu_so.html', {})


def visu_ajax_gzd(request):
    if request.method == 'POST':
        if request.is_ajax():
            qdata = AnalizatorData.objects.filter(an_date__lte=timezone.now()). \
                        order_by('-an_date')[:1].all().values()
            tdata = qdata[0]
            data = dict()
            data['n'] = round(tdata['so_n'], 2)
            data['m'] = round(tdata['so_m'], 2)
            data['ug'] = round(tdata['so_ug'], 2)
            data['n_n'] = tdata['so_n_nr']
            data['n_m'] = tdata['so_m_nr']
            data['n_ug'] = tdata['so_ug_nr']
            data['v_n'] = tdata['so_n_nr_v']
            data['v_m'] = tdata['so_m_nr_v']
            data['v_ug'] = tdata['so_ug_nr_v']
            data['n_q'] = 192
            data['m_q'] = 192
            data['ug_q'] = 192
            return HttpResponse(json.dumps(data), content_type="application/json")


def visu_ajax_thrend(request):
    if request.method == 'POST':
        if request.is_ajax():
            cid = int(request.POST['id'])
            data = DataForChart.data_chart(cid)
            return HttpResponse(json.dumps(data), content_type="application/json")
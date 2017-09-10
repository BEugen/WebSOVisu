from django.shortcuts import render, redirect, HttpResponse, render_to_response, HttpResponseRedirect
from django.contrib.auth import authenticate, login
import json


# Create your views here.
def visu_so(request):
    return render(request, 'sovisu/visu_so.html', {})


def visu_ajax_gzd(request):
    if request.method == 'POST':
        if request.is_ajax():
            data = {'n': 0.29, 'n_q': 192, 'm': 0.29, 'm_q': 192, 'ug': 0.29, 'ug_q': 192,
                     'n_ug': 2, 'v_ug': 0.9, 'n_m': 0, 'v_m': 0.6, 'n_n': 1, 'v_n': 0.9}
            return HttpResponse(json.dumps(data), content_type="application/json")

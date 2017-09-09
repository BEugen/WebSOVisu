from django.shortcuts import render, redirect, HttpResponse, render_to_response, HttpResponseRedirect
from django.contrib.auth import authenticate, login
import json


# Create your views here.
def visu_so(request):
    return render(request, 'sovisu/visu_so.html', {})


def visu_ajax_gzd(request):
    if request.method == 'POST':
        if request.is_ajax():

            print("**ajax form post**")
            for k, v in request.POST.items():
                print(k, v)

            print("field1 data: %s" % request.POST['field1'])
            print("field2 data: %s" % request.POST['field2'])

            mydata = [{'foo': 1, 'baz': 2}]
            return HttpResponse(json.dumps(mydata), mimetype="application/json")

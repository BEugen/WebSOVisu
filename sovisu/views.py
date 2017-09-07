from django.shortcuts import render


# Create your views here.
def visu_so(request):
    return render(request, 'sovisu/visu_so.html', {})

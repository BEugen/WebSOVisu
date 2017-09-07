from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.visu_so, name='visu_so'),
]
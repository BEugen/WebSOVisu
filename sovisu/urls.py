from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.visu_so, name='visu_so'),
    url(r'^visu_ajax_gzd', views.visu_ajax_gzd, name='visu_ajax_gzd'),
    url(r'^visu_ajax_thrend', views.visu_ajax_thrend, name='visu_ajax_thrend'),
]
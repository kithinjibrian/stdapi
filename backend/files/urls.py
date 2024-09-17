from . import views
from django.urls import include, path


urlpatterns = [
    path('files/', views.get_files, name='get_files'),
    path('get_file/', views.get_file, name='get_file'),
    path('get_file_content/', views.get_file_content, name='get_file_content'),
]
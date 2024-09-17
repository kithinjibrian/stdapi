import os
import uuid
import json
import mimetypes
from django.conf import settings
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt

def query_files(path):
    files = []
    top_level_items = os.listdir(path)
    for item in top_level_items:
        full_path = os.path.join(path, item)
        if os.path.isdir(full_path):
            files.append({'id':uuid.uuid4(), 'title':item, 'children': [], 'full_path':full_path})
        else:
            mime_type, encoding = mimetypes.guess_type(full_path)
            file_type = None
            file = None
            if mime_type is not None:
                types = mime_type.split('/')
                file_type = types[0]
                file = types[1]
            else:
                file_type = 'text'
                file = 'unknown'
            
            files.append({
                'id':uuid.uuid4(), 
                'title':item, 
                'type':'file', 
                'type':file_type, 
                'file': file,
                'size': os.path.getsize(full_path),
                'full_path':full_path
                })
    return files


@csrf_exempt
def get_files(request):
    return JsonResponse(query_files(settings.BASE_DIR), safe=False)


@csrf_exempt
def get_file(request):
    data = json.loads(request.body)
    path = data.get('path')
    return JsonResponse(query_files(path), safe=False)

@csrf_exempt
def get_file_content(request):
    data = json.loads(request.body)
    path = data.get('path')
    try:
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        content_type = 'text/plain'
    except IOError:
        # If binary read
        with open(path, 'rb') as f:
            content = f.read()
        content_type = 'application/octet-stream'
    response = HttpResponse(content, content_type=content_type)
    response['Content-Disposition'] = f'attachment; filename="{os.path.basename(path)}"'
    return response


@csrf_exempt
def save_file(request):
    pass
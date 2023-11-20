from django.http import JsonResponse
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import os

@csrf_exempt
@require_POST
def upload_image(request):
    uploaded_files = request.FILES.getlist('image')

    for uploaded_file in uploaded_files:
        file_path = os.path.join(settings.MEDIA_ROOT, 'uploads', uploaded_file.name)

        with open(file_path, 'wb') as destination:
            for chunk in uploaded_file.chunks():
                destination.write(chunk)

    return JsonResponse({'message': 'Images uploaded successfully'})



def not_found(request, *args, **kwargs):
    return JsonResponse(data={"message": "Not Found"}, status=404)


def app_error(request, *args, **kwargs):
    return JsonResponse(data={"message": "Server Error"}, status=500)

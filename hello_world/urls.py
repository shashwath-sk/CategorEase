from django.urls import path, include

from hello_world.views import not_found, app_error

import logging
from .views import upload_image

logger = logging.getLogger(__name__)

handler404 = not_found
handler500 = app_error

logger.debug("here")
logger.info("This is a log message from my_function")

urlpatterns = [
    path('api/messages/', include('messages_api.urls')),
    path('upload_image/', upload_image, name='upload_image'),
]

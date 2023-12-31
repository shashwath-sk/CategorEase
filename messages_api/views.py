from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import exception_handler

from authz.permissions import HasAdminPermission
from messages_api.models import Message
from messages_api.serializers import MessageSerializer
import logging
logger = logging.getLogger(__name__)

class MessageApiView(RetrieveAPIView):
    serializer_class = MessageSerializer
    text = None

    def get_object(self):
        logger.debug("here",self.text)
        logger.info("This is a log message from my_function")
        return Message(text=self.text)


class PublicMessageApiView(MessageApiView):
    text = "This is a public message."


class ProtectedMessageApiView(MessageApiView):
    text = "This is a protected message."
    permission_classes = [IsAuthenticated]


class AdminMessageApiView(MessageApiView):
    text = "admin"
    permission_classes = [IsAuthenticated, HasAdminPermission]
    


def api_exception_handler(exc, context=None):
    response = exception_handler(exc, context=context)
    if response.status_code == 403:
        response.data = {
            'error': 'insufficient_permissions',
            'error_description': response.data.get('detail', 'API Error'),
            'message': 'Permission denied'
        }
    elif response and isinstance(response.data, dict):
        response.data = {'message': response.data.get('detail', 'API Error')}
    else:
        response.data = {'message': 'API Error'}
    return response

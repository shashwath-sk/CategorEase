from django.utils.cache import add_never_cache_headers
import logging


class Auth0Middleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        response['Expires'] = 0
        add_never_cache_headers(response)
        response['X-XSS-Protection'] = 0
        response['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
        return response
    

class ResponseLoggingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        # Log the response
        response_data = response.content.decode('utf-8')  # Adjust as needed
        logging.debug(f'Response: {response_data}')

        return response


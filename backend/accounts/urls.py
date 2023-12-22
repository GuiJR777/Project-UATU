from django.urls import path

from .views import get_user_profile, register_user, MyTokenObtainPairView


urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/', get_user_profile, name='user-profile'),
    path('register/', register_user, name='new-user-register'),
]

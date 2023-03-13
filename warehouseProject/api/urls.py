from django.urls import path
from .views import new_item, items, phones,remove_item, add_item,item, MyTokenObtainPairView, set_active_warehouse, get_user_settings, get_logs, add_log
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('items', items, name='items'),
    path('items/<int:pk>', item, name='items'),
    path('remove_item', remove_item, name='remove_item'),
    path('phones', phones, name='phones'),
    path('add_item', add_item, name='add_item'),
    path('token', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('set_active_warehouse', set_active_warehouse, name='set_active_warehouse'),
    path('get_user_settings', get_user_settings, name='get_user_settings'),
    path('new_item', new_item, name='new_item'),
    path('get_logs', get_logs, name='get_logs'),
    path('add_log', add_log, name='add_log')
    
    
]

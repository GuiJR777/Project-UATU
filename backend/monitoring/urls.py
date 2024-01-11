from django.urls import path
from .views import (
    MonitoringListCreateView,
    MonitoringDetailView,
    MonitoringListView
)

urlpatterns = [
    path(
        '/',
        MonitoringListView.as_view(),
        name='monitoring-list'
    ),
    path(
        '/<int:pk>/',
        MonitoringDetailView.as_view(),
        name='monitoring-detail'
    ),
    path(
        '/create/',
        MonitoringListCreateView.as_view(),
        name='monitoring-create'
    ),
    path(
        '/<int:pk>/update/',
        MonitoringDetailView.as_view(),
        name='monitoring-update'
    ),
    path(
        '/<int:pk>/delete/',
        MonitoringDetailView.as_view(),
        name='monitoring-delete'
    ),
]

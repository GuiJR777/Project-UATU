from django.urls import path
from .views import (
    MonitoringListCreateView,
    MonitoringDetailView,
    MonitoringListView
)

urlpatterns = [
    path(
        'monitorings/',
        MonitoringListView.as_view(),
        name='monitoring-list'
    ),
    path(
        'monitorings/<int:pk>/',
        MonitoringDetailView.as_view(),
        name='monitoring-detail'
    ),
    path(
        'monitorings/create/',
        MonitoringListCreateView.as_view(),
        name='monitoring-create'
    ),
    path(
        'monitorings/<int:pk>/update/',
        MonitoringDetailView.as_view(),
        name='monitoring-update'
    ),
    path(
        'monitorings/<int:pk>/delete/',
        MonitoringDetailView.as_view(),
        name='monitoring-delete'
    ),
]

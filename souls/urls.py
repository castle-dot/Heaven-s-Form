from rest_framework_nested import routers
from . import views
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = routers.DefaultRouter()
router.register('souls', views.SoulViewSet)

souls_router = routers.NestedDefaultRouter(router, 'souls', lookup='soul')
souls_router.register('confessions', views.ConfessionViewSet, basename='confession')

urlpatterns = router.urls + souls_router.urls 
urlpatterns += [
    path('register/', views.RegisterView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
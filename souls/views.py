from django.shortcuts import render
from rest_framework import viewsets
from souls.models import Confession, Soul
from souls.serializers import ConfessionSerializer, SoulSerializer
from django.contrib.auth.models import User
from rest_framework import viewsets, generics, permissions
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer
from .permissions import IsOwnerOrReadOnly
# Create your views here.
from rest_framework.decorators import action
from rest_framework.response import Response

class SoulViewSet(viewsets.ModelViewSet):
    queryset = Soul.objects.all()
    serializer_class = SoulSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        try:
            soul = Soul.objects.get(user=request.user)
            serializer = self.get_serializer(soul)
            return Response(serializer.data)
        except Soul.DoesNotExist:
            return Response({'detail': 'No soul found'}, status=404)
    @action(detail=False, methods=['get'])
    def stats(self, request):
         total = Soul.objects.count()
         limit = 144000
         remaining = limit - total
         percentage = (total / limit) * 100 if limit > 0 else 0
         return Response({
            'total': total,
            'remaining': remaining,
            'percentage': round(percentage, 4),
            'limit': limit
            })

class ConfessionViewSet(viewsets.ModelViewSet):
    queryset = Confession.objects.all()
    serializer_class = ConfessionSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_queryset(self):
        soul_pk = self.kwargs['soul_pk']
        return Confession.objects.filter(soul_id=soul_pk)

    def perform_create(self, serializer):
        soul = Soul.objects.get(user=self.request.user)
        serializer.save(soul=soul)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]



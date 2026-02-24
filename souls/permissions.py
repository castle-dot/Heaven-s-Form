from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        # Handle both Soul and Confession objects
        if hasattr(obj, 'user'):
            return obj.user == request.user
        if hasattr(obj, 'soul'):
            return obj.soul.user == request.user
        return False
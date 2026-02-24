from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Soul(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='soul_profile')
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
class Confession(models.Model):
    soul = models.ForeignKey(Soul, on_delete=models.CASCADE, related_name='confessions')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Confession by {self.soul.name} at {self.created_at}"
    

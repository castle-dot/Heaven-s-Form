from django.contrib import admin
from .models import Soul, Confession
# Register your models here.


@admin.register(Soul)
class SoulAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'created_at']
    search_fields = ['name']
@admin.register(Confession)
class ConfessionAdmin(admin.ModelAdmin):   
    list_display = ['id', 'soul', 'content', 'created_at']
    search_fields = ['content']
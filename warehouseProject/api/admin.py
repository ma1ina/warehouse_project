from django.contrib import admin
from .models.main import Item, Warehouse, Phone, Phone_item, Color, Category, UserProfile
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin

admin.site.register(Item)
admin.site.register(Warehouse)
admin.site.register(Phone)
admin.site.register(Phone_item)
admin.site.register(Color)
admin.site.register(Category)
admin.site.register(UserProfile)

class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'userprofile'
    
class UserAdmin(UserAdmin):
    inlines = (UserProfileInline, )
    
admin.site.unregister(User)
admin.site.register(User, UserAdmin)




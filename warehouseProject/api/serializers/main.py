from ..models.main import Item, Warehouse, Phone, Phone_item, Category, Color, UserProfile, UserAction
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import User

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token




class ItemSerializer(serializers.ModelSerializer):
    phone_model=serializers.ReadOnlyField(source='phone.model')
    phone_brand=serializers.ReadOnlyField(source='phone.brand')
    category=serializers.ReadOnlyField(source='category.name')
    color=serializers.ReadOnlyField(source='color.name')
    
    class Meta:
        model = Item
        fields = ['id','name', 'warehouse', 'description', 'category','color', 'price', 'quantity', 'ordered', 'phone_model', 'phone_brand']

class WarehouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Warehouse
        fields = '__all__'
        
class PhoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phone
        fields = '__all__'
        
class Phone_itemSerializer(serializers.ModelSerializer):
    phone_model=serializers.ReadOnlyField(source='phone.model')
    phone_brand=serializers.ReadOnlyField(source='phone.brand')
    class Meta:
        model = Phone_item
        fields = ['id','phone_model', 'phone_brand', 'imei','priceBuy', 'priceSell']
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = '__all__'
            
        
class UserActionSerializer(serializers.ModelSerializer):
    item_name = serializers.ReadOnlyField(source='item.name')
    item_id = serializers.ReadOnlyField(source='item.id')
    item_phone_brand = serializers.ReadOnlyField(source='item.phone.brand')
    item_phone_model = serializers.ReadOnlyField(source='item.phone.model')
    item_color = serializers.ReadOnlyField(source='item.color.name')
    user = serializers.ReadOnlyField(source='user.username')
    
    class Meta:
        model = UserAction
        fields = ['id','user','item_name','item_id','item_phone_brand','item_phone_model','item_color','action','date','price','quantity','comment']

class LogsSerializer(serializers.ModelSerializer):
    type = 'test'
    
    class Meta:
        model = User
        fields = ['username', 'password']

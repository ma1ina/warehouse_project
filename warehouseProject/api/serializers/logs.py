from rest_framework import serializers
from django.contrib.auth.models import User
from ..models.logs import SellItemLog, CreateItemLog, ModifyPriceLog, AddItemLog, SellOtherItem


class SellItemLogSerializer(serializers.ModelSerializer):
    item_name = serializers.ReadOnlyField(source='item.name')
    item_id = serializers.ReadOnlyField(source='item.id')
    item_phone_brand = serializers.ReadOnlyField(source='item.phone.brand')
    item_phone_model = serializers.ReadOnlyField(source='item.phone.model')
    item_color = serializers.ReadOnlyField(source='item.color.name')
    user = serializers.ReadOnlyField(source='user.username')
    
    class Meta:
        model = SellItemLog
        fields = fields = ['id','user','item_name','item_id','item_phone_brand','item_phone_model','item_color','date','price','quantity']

class SellOtherItemSerializer(serializers.ModelSerializer):
    
    user = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = SellOtherItem
        fields = ['id','user','name','date','price','quantity']        
        
class CreateItemLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreateItemLog
        fields = '__all__'
        
        
class ModifyPriceLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModifyPriceLog
        fields = '__all__'
        
        
class AddItemLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = AddItemLog
        fields = '__all__'

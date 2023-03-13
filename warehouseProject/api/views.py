from django.http import JsonResponse
from .models.main import Item, Warehouse, Phone, Phone_item, Category, Color, UserProfile, UserAction
from .models.logs import SellItemLog, CreateItemLog, AddItemLog, SellOtherItem
from .serializers.logs import SellItemLogSerializer, CreateItemLogSerializer, AddItemLogSerializer, SellOtherItemSerializer
import json
from django.forms.models import model_to_dict
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from .serializers.main import *
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from datetime import datetime

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# Create your views here.



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def items(request):
    if request.method == 'GET':
        items = Item.objects.filter(warehouse=UserProfile.objects.get(user=request.user).active_warehouse)
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data, status=200)
    return Response(serializer.errors, status=403)

@api_view(['GET'])
def phones(request):
    phones = Phone_item.objects.all()
    serializer = Phone_itemSerializer(phones, many=True)
    return Response(serializer.data, status=200)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_item(request):
    data = request.data
    item = Item.objects.get(id=data['id'])
    item.subtract_quantity(1)
    UserAction.objects.create(
        user=request.user,
        warehouse=item.warehouse,
        item=item,
        action='SELL',
        quantity=1,
        price= item.price,
    )
    SellItemLog.objects.create(
        user=request.user,
        warehouse=item.warehouse,
        item=item,
        quantity=1,
        price= item.price,
    )
    return Response(status=204)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_item(request): 
    data = request.data
    item = Item.objects.get(id=data['id'])
    item.add_quantity(1)
    UserAction.objects.create(
        user=request.user,
        action='ADD',
        item=item,
        quantity=1,
        warehouse=item.warehouse,
        )
    AddItemLog.objects.create(
        user=request.user,
        warehouse=item.warehouse,
        item=item,
        quantity=1,
    )
    return Response(status=204)




@api_view(['GET'])
def item(request, pk):
    item = Item.objects.get(id=pk)
    serializer = ItemSerializer(item, many=False)
    return Response(serializer.data, status=200)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def set_active_warehouse(request):
    data = request.data
    if data['id'] in [x.id for x in UserProfile.objects.get(user=request.user).assigned_warehouses.all()]:
        UserProfile.objects.get(user=request.user).set_active_warehouse(data['id'])
        return Response(status=204)
    else:
        return Response(status=403)
    


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_settings(request):
    userProfile = UserProfile.objects.get(user=request.user)
    
    data ={
        'username':userProfile.user.username,
        'active_warehouse':{
            'id':userProfile.active_warehouse.id,
            'name':userProfile.active_warehouse.name,
        },
        'assigned_warehouses':[{'id':x.id,'name':x.name} for x in userProfile.assigned_warehouses.all()],
    } 
    
    return Response(data, status=200)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def new_item(request):
    
    data = json.loads(request.body)
    print(data)
    try:
        item = Item.objects.all().filter(
                name=data['name'],
                warehouse=Warehouse.objects.get(id=data['warehouse']),
                category=Category.objects.get(name=data['category']),
                color=Color.objects.get(name=data['color']),
                phone = Phone.objects.get(brand=data['phone_brand'],model=data['phone_model']))
    except:
        return JsonResponse({'message':'Bad data'}, status=400)
    print(bool(item))
    if(item):
        return JsonResponse({'message':'Item already exists'}, status=303)
    try:
        item = Item.objects.create(
            name = data['name'],
            description = data['description'],
            quantity = data['quantity'],
            warehouse = Warehouse.objects.get(id=data['warehouse']),
            category = Category.objects.get(name=data['category']),
            color = Color.objects.get(name=data['color']),
            price = data['price'],
            phone = Phone.objects.get(brand=data['phone_brand'],model=data['phone_model']),
        )
        CreateItemLog.objects.create(
            item = item,
            quantity = item.quantity,
            user = request.user,
            warehouse = item.warehouse,
        )
    except:
        return JsonResponse({'message':'Item not created'}, status=400)
    
    
    UserAction.objects.create(
        user=request.user,
        action='ITEM_CREATED',
        warehouse = item.warehouse,
        item = item,
        quantity = item.quantity,
        )
        
    
    return JsonResponse({'message':'Item created successfully'}, status=201)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_logs(request):
    if('date' not in request.data.keys()): return Response(status=400)
    try:
        date = datetime.fromisoformat(request.data['date'][:-1]).date()
    except:
        return Response(status=400)
    sell_items = SellItemLog.objects.filter(warehouse=UserProfile.objects.get(user=request.user).active_warehouse, date__contains=date)
    sell_items_serializer = SellItemLogSerializer(sell_items, many=True)
    other_sell_items = SellOtherItem.objects.filter(warehouse=UserProfile.objects.get(user=request.user).active_warehouse, date__contains=date)
    other_sell_items_serializer = SellOtherItemSerializer(other_sell_items, many=True)
    return Response(
        {'sold': sell_items_serializer.data,
         'other_sold': other_sell_items_serializer.data}, status=200)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_log(request):
    data= request.data
    if('name' not in data.keys() or 'quantity' not in data.keys() or 'price' not in data.keys()):
        return Response(status=400)
    else:
        try:
            SellOtherItem.objects.create(
                user=request.user,
                warehouse=UserProfile.objects.get(user=request.user).active_warehouse,
                name=data['name'],
                quantity=data['quantity'],
                price=data['price'],
            )
            return Response(status=201)
        except:
            return Response(status=400)
    

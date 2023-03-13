from django.db import models
from decimal import Decimal
from django.contrib.auth.models import User

class Item(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    warehouse = models.ForeignKey('warehouse', on_delete=models.CASCADE,default=1)
    description = models.TextField(blank=True)
    category = models.ForeignKey('category', on_delete=models.CASCADE, default=1)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    quantity = models.IntegerField(default=1)
    phone=models.ForeignKey('phone', on_delete=models.CASCADE, default=1)
    ordered = models.BooleanField(default=False)
    color = models.ForeignKey('color', on_delete=models.CASCADE, default=1)

    def subtract_quantity(self, quantity):
        self.quantity -= quantity
        self.save()
    def add_quantity(self, quantity):
        self.quantity += quantity
        self.save()
    
    def __str__(self):
        return self.name
    class Meta:
        verbose_name_plural = 'Items'
        
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    active_warehouse = models.ForeignKey('warehouse', on_delete=models.CASCADE, default=1)
    assigned_warehouses = models.ManyToManyField('warehouse', related_name='assigned_users')
    
    def set_active_warehouse(self, warehouse_id):
        self.active_warehouse = Warehouse.objects.get(id=warehouse_id)
        self.save()
    
    def __str__(self):
        return self.user.username
        

class Warehouse(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200, unique=True)
    address = models.CharField(max_length=200)
    phone = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    description = models.TextField()
    def __str__(self):
        return self.name
    class Meta:
        verbose_name_plural = 'Warehouses'

#Phone model for physical phones
class Phone_item(models.Model):
    id = models.AutoField(primary_key=True)
    phone = models.ForeignKey('phone', on_delete=models.CASCADE, null=True, blank=True)
    imei = models.CharField(max_length=15)
    Color = models.ForeignKey('Color', on_delete=models.CASCADE, null=True, blank=True)
    priceBuy = models.DecimalField(default=Decimal('0.00'), max_digits=6, decimal_places=2)
    priceSell = models.DecimalField(default=Decimal('9999.00'), max_digits=6, decimal_places=2)
    def __str__(self):
        return f'{self.phone.brand} {self.phone.model}'
    class Meta:
        verbose_name_plural = 'Phone_items'
        
#Phone model for item ditails
class Phone(models.Model):
    id = models.AutoField(primary_key=True)
    brand = models.CharField(max_length=200)
    model = models.CharField(max_length=200, blank=True)
    def __str__(self):
        return f"{self.brand} {self.model}"
    class Meta:
        verbose_name_plural = 'Phones'


class Color(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    def __str__(self):
        return self.name
    class Meta:
        verbose_name_plural = 'Colors'

class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    def __str__(self):
        return self.name
    class Meta:
        verbose_name_plural = 'Categories'


class UserAction(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    action = models.CharField(max_length=200)
    warehouse = models.ForeignKey('warehouse', on_delete=models.CASCADE, default=1)
    item = models.ForeignKey('item', on_delete=models.CASCADE, null=True, blank=True)
    price = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    quantity = models.IntegerField(null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    comment = models.CharField(blank=True, max_length=200)
    
    def __str__(self):
        return f"{self.user} {self.action}"
    class Meta:
        verbose_name_plural = 'UserActions'


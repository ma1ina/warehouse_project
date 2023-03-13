from django.db import models
from django.contrib.auth.models import User

class SellItemLog(models.Model):
    
    item = models.ForeignKey('Item', on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price = models.FloatField()
    
    date  = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    warehouse = models.ForeignKey('Warehouse', on_delete=models.CASCADE)    
    
    def __str__(self):
        return f'{self.item.name} {self.quantity} {self.price} {self.date} {self.user.user.username}'
    
class SellOtherItem(models.Model):
        
        name = models.CharField(max_length=100)
        quantity = models.IntegerField()
        price = models.FloatField()
        
        date  = models.DateTimeField(auto_now_add=True)
        user = models.ForeignKey(User, on_delete=models.CASCADE)
        warehouse = models.ForeignKey('Warehouse', on_delete=models.CASCADE)    
        
        def __str__(self):
            return f'{self.name} {self.quantity} {self.price} {self.date} {self.user.user.username}'


class CreateItemLog(models.Model):
    
    item = models.ForeignKey('Item', on_delete=models.CASCADE)
    quantity = models.IntegerField()
    
    date  = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    warehouse = models.ForeignKey('Warehouse', on_delete=models.CASCADE)    

    def __str__(self):
        return f'{self.item.name} {self.quantity} {self.price} {self.date} {self.user.user.username}'
    
class ModifyPriceLog(models.Model):
    
    item = models.ForeignKey('Item', on_delete=models.CASCADE)
    previous_price = models.FloatField()
    
    date  = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    warehouse = models.ForeignKey('Warehouse', on_delete=models.CASCADE)    
    def __str__(self):
        return f'{self.item.name} {self.quantity} {self.price} {self.date} {self.user.user.username}'

class AddItemLog(models.Model):
    item = models.ForeignKey('Item', on_delete=models.CASCADE)
    quantity = models.IntegerField()
    
    date  = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    warehouse = models.ForeignKey('Warehouse', on_delete=models.CASCADE)   
     
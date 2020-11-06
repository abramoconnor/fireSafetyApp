from rest_framework import serializers
from sprinklers.models import Sprinklers

class SprinklersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sprinklers
        fields = '__all__'
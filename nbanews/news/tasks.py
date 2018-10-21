'''
Created on Oct 21, 2018

@author: s0974129
'''

# Create your tasks here
from __future__ import absolute_import, unicode_literals
from celery import shared_task


@shared_task
def add(x, y):
    
    print('x : %s, y : %s'%( x, y))
    return x + y
    
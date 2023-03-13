from django.shortcuts import render
from rest_framework import viewsets
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from .serializers import DepartmentSerializer,EmployeeSerializer
from .models import Departments,Employees

from django.core.files.storage import default_storage

# Create your views here.

# class DepartmentView(viewsets.ModelViewSet):
#     serializer_class = DepartmentSerializer
#     queryset = Departments.objects.all()

# class EmployeeView(viewsets.ModelViewSet):
#     serializer_class = EmployeeSerializer
#     queryset = Employees.objects.all()

@csrf_exempt
def departmentApi(req,id=0):
    if req.method=='GET':
        departments=Departments.objects.all()
        departments_serilizer = DepartmentSerializer(departments,many=True)
        return JsonResponse(departments_serilizer.data,safe=False)
    elif req.method=='POST':
        department_data =JSONParser().parse(req)
        departments_serilizer=DepartmentSerializer(data=department_data)
        if departments_serilizer.is_valid():
            departments_serilizer.save()
            return JsonResponse('Added Successfully!!',safe=False)
        return JsonResponse('Failed to ADd.',safe=False)

    elif req.method=='PUT':
        department_data=JSONParser().parse(req)
        department=Departments.objects.get(DepartmentId=department_data['DepartmentId'])
        departments_serilizer=DepartmentSerializer(department,data=department_data)
        if departments_serilizer.is_valid():
            departments_serilizer.save()
            return JsonResponse('Updated Successfully!!',safe=False)
        return JsonResponse('Failed to Update.',safe=False)
    
    elif req.method=='DELETE':
        department=Departments.objects.get(DepartmentId=id)
        department.delete()
        return JsonResponse('Deleted Succesfully!!',safe=False)
    
@csrf_exempt
def employeeApi(req,id=0):
    if req.method=='GET':
        employee=Employees.objects.all()
        employee_serilizer = EmployeeSerializer(employee,many=True)
        return JsonResponse(employee_serilizer.data,safe=False)
    elif req.method=='POST':
        employee_data =JSONParser().parse(req)
        employee_serilizer=EmployeeSerializer(data=employee_data)
        if employee_serilizer.is_valid():
            employee_serilizer.save()
            return JsonResponse('Added Successfully!!',safe=False)
        return JsonResponse('Failed to ADd.',safe=False)

    elif req.method=='PUT':
        employee_data=JSONParser().parse(req)
        employee=Employees.objects.get(EmployeeId=employee_data['EmployeeId'])
        employee_serilizer=EmployeeSerializer(employee,data=employee_data)
        if employee_serilizer.is_valid():
            employee_serilizer.save()
            return JsonResponse('Updated Successfully!!',safe=False)
        return JsonResponse('Failed to Update.',safe=False)
    
    elif req.method=='DELETE':
        employee=Employees.objects.get(EmployeeId=id)
        employee.delete()
        return JsonResponse('Deleted Succesfully!!',safe=False)
    

@csrf_exempt
def SaveFile(request):
    file=request.FILES['myFile']
    file_name = default_storage.save(file.name,file)

    return JsonResponse(file_name,safe=False)
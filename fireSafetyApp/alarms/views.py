from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.template.loader import get_template
from xhtml2pdf import pisa
from .models import AlarmSystemInspection
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view

@csrf_exempt
@api_view(['POST'])
def alarmsys_report_pdf_view(request, *args, **kwargs):
    building = request.data['building']
    alarm_system = request.data['as']
    notes = request.data['notes']

    if not notes:
       template_path = 'alarm.html'
       context = {'building': building, 'alarm_system': alarm_system}
    else:
       template_path = 'alarmWithNotes.html'
       context = {'building': building, 'alarm_system': alarm_system, 'notes': notes}
    # Create a Django response object, and specify content_type as pdf
    response = HttpResponse(content_type='application/pdf')
    # if download:
    # response['Content-Disposition'] = 'attachment; filename="report.pdf"'
    # if display:
    response['Content-Disposition'] = 'filename="report.pdf"'
    # find the template and render it.
    template = get_template(template_path)
    html = template.render(context)

    # create a pdf
    pisa_status = pisa.CreatePDF(
       html, dest=response)
    # if error then show some funy view
    if pisa_status.err:
       return HttpResponse('We had some errors <pre>' + html + '</pre>')
    return response
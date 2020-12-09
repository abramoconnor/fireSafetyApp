from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.template.loader import get_template
from xhtml2pdf import pisa
from .models import PumpInspection
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view

@csrf_exempt
@api_view(['POST'])
def pump_report_pdf_view(request, *args, **kwargs):
    building = request.data['building']
    pump = request.data['pump']
    notes = request.data['notes']
    attributes = request.data['attributes']

    if not notes:
       template_path = 'pump.html'
       context = {'building': building, 'pump': pump, 'attributes': attributes}
    else:
       template_path = 'pumpWithNotes.html'
       context = {'building': building, 'pump': pump, 'notes': notes, 'attributes': attributes}
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
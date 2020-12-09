from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.template.loader import get_template
from xhtml2pdf import pisa
from .models import SprinklerSystemInspection
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view

@csrf_exempt
@api_view(['POST'])
def sprinklersys_report_pdf_view(request, *args, **kwargs):
    building = request.data['building']
    ss = request.data['ss']
    notes = request.data['notes']
    pressures = request.data['pressures']

    if not notes:
       if ss['system_type'] == 'Wet':
         template_path = 'wetSprinkler.html'
       else:
         template_path = 'dryOrPreActionSprinkler.html'
       context = {'building': building, 'ss': ss, 'pressures': pressures}
    else:
       if ss['system_type'] == 'Wet':
         template_path = 'wetSprinklerWithNotes.html'
       else:
         template_path = 'dryOrPreActionSprinklerWithNotes.html'
       context = {'building': building, 'ss': ss, 'notes': notes, 'pressures': pressures}
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
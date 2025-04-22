from django.http import JsonResponse
from django.contrib.auth import authenticate, get_user_model
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from .models import Booking
import stripe
import json

stripe.api_key = settings.STRIPE_SECRET_KEY

@csrf_exempt
def login_view(request):
    if request.method == 'OPTIONS':
        response = JsonResponse({'message': 'OK'})
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type"
        return response

    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')

            user = authenticate(username=username, password=password)

            if user is not None:
                return JsonResponse({
                    'success': True,
                    'username': user.username,
                    'email': user.email,
                    'role': user.role,
                })
            else:
                return JsonResponse({'success': False, 'message': 'Invalid credentials'}, status=401)
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)}, status=500)

    return JsonResponse({'error': 'Only POST and OPTIONS allowed'}, status=405)

@csrf_exempt
def book_class(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        class_name = data.get('class_name')
        time = data.get('time')

        User = get_user_model()
        user = User.objects.get(username=username)

        Booking.objects.create(user=user, class_name=class_name, time=time)
        return JsonResponse({'success': True})
    
    return JsonResponse({'error': 'POST request required'}, status=405)

@csrf_exempt
def get_user_bookings(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')

        User = get_user_model()
        user = User.objects.get(username=username)

        bookings = Booking.objects.filter(user=user).values('class_name', 'time', 'paid')
        return JsonResponse({'bookings': list(bookings)})

@csrf_exempt
def cancel_booking(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        class_name = data.get('class_name')

        User = get_user_model()
        user = User.objects.get(username=username)

        Booking.objects.filter(user=user, class_name=class_name).delete()
        return JsonResponse({'success': True})

@csrf_exempt
def admin_class_summary(request):
    if request.method == 'GET':
        summary = {}
        classes = Booking.objects.values_list('class_name', flat=True).distinct()
        for class_name in classes:
            count = Booking.objects.filter(class_name=class_name).count()
            summary[class_name] = count
        return JsonResponse({'summary': summary})

@csrf_exempt
def get_class_users(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        class_name = data.get('class_name')

        users = Booking.objects.filter(class_name=class_name).select_related('user')
        user_list = [{'username': b.user.username, 'email': b.user.email} for b in users]
        return JsonResponse({'users': user_list})

@csrf_exempt
def admin_remove_user(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        class_name = data.get('class_name')

        User = get_user_model()
        user = User.objects.get(username=username)

        Booking.objects.filter(user=user, class_name=class_name).delete()
        return JsonResponse({'success': True})

@csrf_exempt
def create_multi_checkout_session(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        class_list = data.get('classes', [])

        User = get_user_model()
        user = User.objects.get(username=username)

        # Pre-create unpaid bookings
        for cls in class_list:
            Booking.objects.get_or_create(
                user=user,
                class_name=cls['name'],
                time=cls['time'],
                defaults={'paid': False}
            )

        line_items = []
        for cls in class_list:
            line_items.append({
                'price_data': {
                    'currency': 'usd',
                    'unit_amount': 1000,  # $10 per class
                    'product_data': {
                        'name': f"{cls['name']} - {cls['time']}",
                    },
                },
                'quantity': 1,
            })

        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=line_items,
            mode='payment',
            success_url=f"{settings.FRONTEND_URL}/schedule?session_id={{CHECKOUT_SESSION_ID}}",
            cancel_url=f"{settings.FRONTEND_URL}/available-classes",
            metadata={
                'username': username,
                'classes': json.dumps(class_list)
            }
        )
        return JsonResponse({'sessionId': session.id})

@csrf_exempt
def confirm_payment(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        session_id = data.get('session_id')

        session = stripe.checkout.Session.retrieve(session_id)

        username = session.metadata.get('username')
        classes = json.loads(session.metadata.get('classes', '[]'))

        User = get_user_model()
        user = User.objects.get(username=username)

        for cls in classes:
            Booking.objects.filter(
                user=user,
                class_name=cls['name'],
                time=cls['time'],
                paid=False
            ).update(paid=True)

        return JsonResponse({'success': True})
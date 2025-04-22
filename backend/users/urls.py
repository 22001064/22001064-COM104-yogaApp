from django.urls import path
from .views import login_view, book_class, get_user_bookings, cancel_booking, admin_class_summary, get_class_users, admin_remove_user

urlpatterns = [
    path('login/', login_view),
    path('book/', book_class),
    path('mybookings/', get_user_bookings),
    path('cancel/', cancel_booking),
    path('admin/summary/', admin_class_summary),
    path('admin/class-users/', get_class_users),
    path('admin/remove/', admin_remove_user),
]
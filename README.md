# Yoga Task Manager App

A full-stack yoga task management app built using React, Django, and SQLite. It supports user and admin roles, login/authentication, task submissions, logout, and Stripe payment.

---

## Features

- Login/Authentication with role-based redirection
- Responsive frontend with Bootstrap
- Admin panel with role management
- RESTful API with token-based authentication
- Supports localStorage/sessionStorage-based session persistence
- Support modal and logout functionality
- Stripe payment integration

---

## Technologies Used

**Frontend:**
- React
- React Router
- Bootstrap (React-Bootstrap)
- CSS Flexbox/Grid

**Backend:**
- Django
- Django REST Framework
- SQLite (development DB)

---

## Setup Instructions (Windows)

### Prerequisites
- Python 3.10+
- Node.js and npm
- Git
- VSCode or other IDE

### Backend (Django)
cd backend


.backend\Scripts\activate

python manage.py migrate

python manage.py createsuperuser # optional

python manage.py runserver

### Frontend (React)
cd frontend

npm install

npm start

Access the frontend at http://localhost:3000 and backend API at http://localhost:8000.

---

## Database Schema & Configuration
CustomUser Model (models.py):
class CustomUser(AbstractUser):
    ROLE_CHOICES = [('user', 'User'), ('admin', 'Admin')]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')

Uses SQLite (db.sqlite3) by default.
If you want to deploy to a production environment (like Heroku, AWS, or a VPS) then modify DATABASES in settings.py for PostgreSQL/MySQL production use.

---

## API Documentation
**Login Endpoint:**
POST /users/login/

**Payload:**
{
  "username": "admin",
  "password": "adminpass123"
}
**Response:**
{
  "success": true,
  "username": "admin",
  "email": "admin@example.com",
  "role": "admin"
}

Includes support for CORS and CSRF headers.

---

## Testing (Haven’t done any yet)

---

## Potential Future Improvements
- Google Sign-In implementation
- Password reset and email verification
- Add tasks and deadlines dashboard
- Use PostgreSQL in production
- Deploy on Heroku or Render
- Add JWT token support for persistent secure login

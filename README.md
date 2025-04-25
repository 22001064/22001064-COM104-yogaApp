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
```bash
cd backend
.backend\Scripts\activate
python manage.py migrate

pip install django
pip install djangorestframework
pip install django-cors-headers
pip install stripe

python manage.py createsuperuser # optional
python manage.py runserver
```

### Frontend (React)
```bash
cd frontend
npm install
npm start
```

Access the frontend at http://localhost:3000 and backend API at http://localhost:8000.

---

## Database Schema & Configuration
CustomUser Model (models.py):

```python
class CustomUser(AbstractUser):
    ROLE_CHOICES = [('user', 'User'), ('admin', 'Admin')]
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')
```

Uses SQLite (db.sqlite3) by default.
If you want to deploy to a production environment (like Heroku, AWS, or a VPS) then modify DATABASES in settings.py for PostgreSQL/MySQL production use.

**Django Administration**

![image](https://github.com/user-attachments/assets/292f09a1-84ac-48e8-9ca9-47039a95692e)

**Configuration Scripts**
```python
python manage.py makemigrations
python manage.py migrate
```

**db.sqlite3**

![image](https://github.com/user-attachments/assets/626e04aa-32c5-4fc5-b011-9300b60a3f71)

---

## API Documentation
**Login Endpoint:**
```bash
POST /users/login/
```

**Payload:**
```json
{
  "username": "admin",
  "password": "adminpass123"
}
```

**Response:**
```json
{
  "success": true,
  "username": "admin",
  "email": "admin@example.com",
  "role": "admin"
}
```

Includes support for CORS and CSRF headers.

---

## Wireframes

**Login Page Wireframe**

![image](https://github.com/user-attachments/assets/9853f041-f545-4f5d-9378-a0017c41df96)

**Schedule Page Wireframe**

![image](https://github.com/user-attachments/assets/4ddd1aa9-d637-47bc-920b-36e2a133903b)

**Available Classes Page Wireframe**

![image](https://github.com/user-attachments/assets/304403ac-2411-42ae-9e77-bf772c4e25c8)

**Overview Page Wireframe**

![image](https://github.com/user-attachments/assets/eac9ff42-37ec-4a87-a380-0683417015b6)

---

## Colour Scheme
For this webapp I just used the colours which I felt made sense, so I went for the simple whites, greys, pale orange, red for cancel/remove buttons and a blue on hovering on a button, as they fit with what I was going with, and also because these colours are quite easy for the eyes to look at as they are not so vibrant.
![image](https://github.com/user-attachments/assets/57ff88d0-5b40-444b-9040-1ac3186d3a30)

---

## Testing

**Google Lighthouse**

I used Lighthouse to test my webapp on both the user and admin side in order to evaluate its performance, accessibility and best practices.

**Login Page**

![image](https://github.com/user-attachments/assets/f29caf42-c381-4c45-a0db-47cb1fc3a94a)

![image](https://github.com/user-attachments/assets/aa5dad09-ed34-49c4-8d16-46e9675e66e1)

**Schedule**

![image](https://github.com/user-attachments/assets/8dfa6b3d-85d1-40c4-8a76-01e047e1f08f)

![image](https://github.com/user-attachments/assets/dfca34ac-b204-41cf-b6a1-1d1bdc726bde)

**Available Classes**

![image](https://github.com/user-attachments/assets/31d0daca-03b2-4a9c-8ce9-c800a7009c83)

![image](https://github.com/user-attachments/assets/a280c828-97b4-48db-8361-8120365fb3c4)

**Overview Page**

![image](https://github.com/user-attachments/assets/f36f5d94-b6a4-4494-b0a3-6c8e35d0b601)

![image](https://github.com/user-attachments/assets/97fe3e9f-b768-48fe-8984-bc0e88e60f6b)

---

## Potential Future Improvements
- Google Sign-In implementation
- Password reset and email verification
- Add tasks and deadlines dashboard
- Use PostgreSQL in production
- Deploy on Heroku, AWS or Render
- Add JWT token support for persistent secure login

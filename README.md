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

## Testing

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

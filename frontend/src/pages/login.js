import React, { useState } from 'react';
import axios from 'axios'; // Axios for API requests
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../styles/Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '', remember: false });
  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCredentials({
      ...credentials,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle login submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/users/login/', {
        username: credentials.username,
        password: credentials.password,
      });

      if (response.data.success) {
        const user = {
          username: response.data.username,
          email: response.data.email,
          role: response.data.role,
        };

        // Store login info (localStorage if "Remember Me" is checked)
        if (credentials.remember) {
          localStorage.setItem('user', JSON.stringify(user));
        } else {
          sessionStorage.setItem('user', JSON.stringify(user));
        }

        window.location.href = '/schedule'; // Redirect to Schedule page
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Server error. Please try again later.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center login-container">
      <Card className="p-4 shadow-lg login-card">
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          {error && <p className="text-danger text-center">{error}</p>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter your username"
                value={credentials.username}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="rememberMe" className="mb-3">
              <Form.Check
                type="checkbox"
                label="Remember Me"
                name="remember"
                checked={credentials.remember}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 l-btn">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
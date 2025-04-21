import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Axios for API requests
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Header from '../components/header';
import UserForm from '../components/form';
import Buttonbrn from '../components/button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from '../components/footer';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import '../styles/Login.css';

const Login = () => {
  // State to show/hide the modal
  const [showModal, setShowModal] = useState(false);

  // Handlers to open and close the modal
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  
  const navigate = useNavigate();
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
      const response = await axios.get(`http://localhost:5000/users?username=${credentials.username}&password=${credentials.password}`);
      if (response.data.length > 0) {
        // Store login info (localStorage if "Remember Me" is checked)
        if (credentials.remember) {
          localStorage.setItem('user', JSON.stringify(response.data[0]));
        } else {
          sessionStorage.setItem('user', JSON.stringify(response.data[0]));
        }
        navigate('/home'); // Redirect to Home
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Failed to connect to server');
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

          <Button variant="primary" type="submit" className="w-100 g-btn">
            Sign in with Google
          </Button> {/* Google login button, not yet implemented */}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
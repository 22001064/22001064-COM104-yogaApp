import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const UserForm = () => {
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [role, setRole] = useState('user');
    const navigate = useNavigate();

    const handleFormSubmit = (event, role) => {
        event.preventDefault();
        const form = event.currentTarget;
    
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {console.log({ email, password, rememberMe, role });
    
            fetch("http://localhost:8000/api/users/login/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: email,
                    password: password,
                    remember_me: rememberMe,
                    role: role
                }),
            })
            .then((res) => res.json())
            .then((data) => {
                if (data.role === role) {
                    alert("Login successful!");
                    if (role === "admin") navigate("/frontend/pages/Home");
                    else navigate("/frontend/pages/Home");
                } else {
                    alert("Unauthorized login attempt: Wrong role.");
                }
            })
            .catch((err) => console.error("Login error", err));
        }
    
        setValidated(true);
    };  

    return (
        <div className='form-area rounded'>
            <div className='mt-4 me-4 mx-4 pb-4 auto'>
                <Tabs
                    defaultActiveKey="user"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                    style={{ background: '#9c8386' }}
                    onSelect={(key) => setRole(key)}
                >
                    {['user', 'admin'].map((roleTab) => (
                        <Tab eventKey={roleTab} title={roleTab.charAt(0).toUpperCase() + roleTab.slice(1)} key={roleTab}>
                            <Form noValidate validated={validated} onSubmit={(e) => handleFormSubmit(e, role)}>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="12">
                                        <Form.Label>Email</Form.Label>
                                        <FloatingLabel controlId="floatingEmail" label="Email address">
                                            <Form.Control
                                                required
                                                type="email"
                                                placeholder="name@example.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid email.
                                            </Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} md="12">
                                        <Form.Label>Password</Form.Label>
                                        <FloatingLabel controlId="floatingPassword" label="Password">
                                            <Form.Control
                                                required
                                                type="password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide your password (min 8 characters).
                                            </Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check
                                            type="checkbox"
                                            label="Remember me"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                        />
                                    </Form.Group>
                                </Row>

                                <Button variant='outline-dark' size='lg' type="submit" id='loginbtn'>
                                    Login
                                </Button>

                                {/* Google login button, not yet implemented */}
                                <Button variant="primary" type="submit" className="w-100 g-btn">
                                    Sign in with Google
                                </Button>
                            </Form>
                        </Tab>
                    ))}
                </Tabs>
            </div>
            <script src="https://apis.google.com/js/platform.js" async defer></script>
        </div>
        
    );
};

export default UserForm;

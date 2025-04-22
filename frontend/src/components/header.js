import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../styles/Header.css';

const Header = () => {
  const [user, setUser] = useState(null);
  const [showSupportModal, setShowSupportModal] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    setUser(null);
    window.location.href = '/'; // Redirect to login page
  };

  return (
    <>
        <div className="header-bar">
            {/* Left: Logo */}
            <div className="header-left">
                <img
                src="/images/yogaLogo.webp"
                alt="Logo"
                />
            </div>

            {/* Right: Support + Logout */}
            <div className="header-right">
                <span onClick={() => setShowSupportModal(true)}>Support</span>
                {user && (
                <Button variant="outline-dark" size="sm" onClick={handleLogout} className="logout-btn">
                    Logout
                </Button>
                )}
            </div>
        </div>

      {/* Support Modal */}
      <Modal show={showSupportModal} onHide={() => setShowSupportModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Support</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          For help, contact: <strong>support@example.com</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSupportModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Header;
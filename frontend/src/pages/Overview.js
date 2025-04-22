import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const Overview = () => {
  const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));
  const [summary, setSummary] = useState({});
  const [selectedClass, setSelectedClass] = useState('');
  const [classUsers, setClassUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/users/admin/summary/')
      .then(res => res.json())
      .then(data => setSummary(data.summary || {}));
  }, []);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/schedule" />;
  }

  const fetchUsers = async (className) => {
    setSelectedClass(className);
    const res = await fetch('http://localhost:8000/users/admin/class-users/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ class_name: className })
    });
    const result = await res.json();
    setClassUsers(result.users);
    setShowModal(true);
  };

  const handleRemove = async (username) => {
    await fetch('http://localhost:8000/users/admin/remove/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, class_name: selectedClass })
    });
    setClassUsers(classUsers.filter(u => u.username !== username));
  };

  return (
    <div>
      <h2>Admin Overview</h2>
      <ul>
        {Object.entries(summary).map(([name, count]) => (
          <li key={name} onClick={() => fetchUsers(name)} style={{ cursor: 'pointer' }}>
            <strong>{name}</strong> – {count} student(s)
          </li>
        ))}
      </ul>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedClass}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {classUsers.length === 0 ? (
            <p>No students booked.</p>
          ) : (
            <ul>
              {classUsers.map(user => (
                <li key={user.username}>
                  {user.username} ({user.email})
                  <Button variant="danger" size="sm" className="ms-2" onClick={() => handleRemove(user.username)}>
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Overview;
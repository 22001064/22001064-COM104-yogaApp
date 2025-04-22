import React, { useEffect, useState } from 'react';

const Schedule = () => {
  const [bookings, setBookings] = useState([]);
  const [justPaid, setJustPaid] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');

    const fetchBookings = async () => {
      const res = await fetch('http://localhost:8000/users/mybookings/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user.username })
      });
      const result = await res.json();
      setBookings(result.bookings || []);
    };

    if (sessionId) {
      fetch('http://localhost:8000/users/confirm-payment/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId })
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setJustPaid(true);
            window.history.replaceState(null, '', '/schedule');
            fetchBookings();
          }
        })
        .catch(err => console.error("Error confirming payment:", err));
    } else {
      fetchBookings();
    }
  }, [user.username]);

  const handleCancel = async (className) => {
    const res = await fetch('http://localhost:8000/users/cancel/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user.username, class_name: className })
    });

    const result = await res.json();
    if (result.success) {
      alert("Booking cancelled");
      setBookings(bookings.filter(b => b.class_name !== className));
    } else {
      alert("Failed to cancel booking");
    }
  };

  return (
    <div>
      <h2>My Booked Classes</h2>

      {justPaid && (
        <div className="alert alert-success text-center">
          Thank you! Your payment was successful and classes are now booked.
        </div>
      )}

      <table className="table table-bordered text-center">
        <thead className="table-light">
          <tr>
            <th>Class</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, index) => (
            <tr key={index}>
              <td>{b.class_name}</td>
              <td>{b.time}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => handleCancel(b.class_name)}>
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Schedule;
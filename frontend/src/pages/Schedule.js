import React, { useEffect, useState } from 'react';

const Schedule = () => {
  const [bookings, setBookings] = useState([]);
  const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await fetch('http://localhost:8000/users/mybookings/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user.username })
      });

      const result = await res.json();
      setBookings(result.bookings || []);
    };

    fetchBookings();
  }, [user.username]);

  const handleCancel = async (className) => {
    const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));
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
              <button className="btn btn-danger btn-sm" onClick={() => handleCancel(b.class_name)}>
                Cancel
              </button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Schedule;
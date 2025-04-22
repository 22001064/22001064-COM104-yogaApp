import React from 'react';
import '../styles/AvailableClasses.css';

const availableClasses = [
  {
    name: 'Hatha Yoga',
    description: 'A gentle introduction to the basics of yoga.',
    time: 'Monday 9:00 AM',
  },
  {
    name: 'Vinyasa Yoga',
    description: 'Flowing sequence of poses with breath.',
    time: 'Tuesday 10:00 AM',
  },
  {
    name: 'Ashtanga Yoga',
    description: 'Dynamic and physically demanding yoga.',
    time: 'Wednesday 11:00 AM',
  },
  {
    name: 'Yin Yoga',
    description: 'Slow-paced style with long-held poses.',
    time: 'Thursday 4:00 PM',
  },
  {
    name: 'Restorative Yoga',
    description: 'Relaxing and meditative practice.',
    time: 'Friday 2:00 PM',
  },
  {
    name: 'Kundalini Yoga',
    description: 'Involves chanting, singing, breathing exercises.',
    time: 'Saturday 8:00 AM',
  },
];

const handleBook = async (cls) => {
  const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));
  if (!user) {
    alert("Please log in first.");
    return;
  }

  try {
    const res = await fetch('http://localhost:8000/users/book/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: user.username,
        class_name: cls.name,
        time: cls.time,
      }),
    });

    const result = await res.json();
    if (res.ok && result.success) {
      alert("Class booked successfully!");
    } else {
      alert(result.message || "Booking failed.");
    }
  } catch (error) {
    console.error("Booking error:", error);
    alert("Something went wrong. Please try again.");
  }
};

const AvailableClasses = () => (
  <>
    <h2>Available Classes</h2>
    <div className="row">
      {availableClasses.map((cls, index) => (
        <div className="col-md-6 mb-3" key={index}>
          <div className="class-card">
            <h4>{cls.name}</h4>
            <p>{cls.description}</p>
            <p><strong>Time:</strong> {cls.time}</p>
            <button className="btn btn-dark" onClick={() => handleBook(cls)}>Book Now</button>
          </div>
        </div>
      ))}
    </div>
  </>
);

export default AvailableClasses;
import React, { useEffect, useState } from 'react';
import '../styles/AvailableClasses.css';
import { loadStripe } from '@stripe/stripe-js';

const availableClasses = [
  { name: 'Hatha Yoga', description: 'A gentle introduction to the basics of yoga.', time: 'Monday 9:00 AM' },
  { name: 'Vinyasa Yoga', description: 'Flowing sequence of poses with breath.', time: 'Tuesday 10:00 AM' },
  { name: 'Ashtanga Yoga', description: 'Dynamic and physically demanding yoga.', time: 'Wednesday 11:00 AM' },
  { name: 'Yin Yoga', description: 'Slow-paced style with long-held poses.', time: 'Thursday 4:00 PM' },
  { name: 'Restorative Yoga', description: 'Relaxing and meditative practice.', time: 'Friday 2:00 PM' },
  { name: 'Kundalini Yoga', description: 'Involves chanting, singing, breathing exercises.', time: 'Saturday 8:00 AM' },
];

const stripePromise = loadStripe('pk_test_51RGiqGPUcMJMZ1zVgBzrquetytO0499lge1ebM7YW8aQ8mDLvOCpKsUMuuK0jUdVDA5v8XdUJgcEklYi9kQg27Wr00qBfobJZe');

const AvailableClasses = () => {
  const [selected, setSelected] = useState([]);
  const [booked, setBooked] = useState([]);
  const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));

  useEffect(() => {
    const fetchBooked = async () => {
      const res = await fetch('http://localhost:8000/users/mybookings/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user.username })
      });
      const result = await res.json();
      setBooked(result.bookings || []);
    };
    if (user?.username) fetchBooked();
  }, [user?.username]);

  const toggleClass = (cls) => {
    setSelected((prev) =>
      prev.includes(cls) ? prev.filter(c => c !== cls) : [...prev, cls]
    );
  };

  const handleMultiCheckout = async () => {
    if (!user) return alert("Please log in first.");
    if (selected.length === 0) return alert("No classes selected.");

    try {
      const res = await fetch('http://localhost:8000/users/pay-multiple/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: user.username,
          classes: selected.map(c => ({ name: c.name, time: c.time }))
        })
      });

      const result = await res.json();
      if (!res.ok || !result.sessionId) {
        alert(result.message || "Failed to create payment session.");
        return;
      }

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: result.sessionId });
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <>
      <h2>Available Classes</h2>
      <div className="row">
        {availableClasses.map((cls, index) => {
          const alreadyBooked = booked.some(b => b.class_name === cls.name && b.paid);
          if (alreadyBooked) return null;

          return (
            <div className="col-md-6 mb-3" key={index}>
              <div className="class-card">
                <h4>{cls.name}</h4>
                <p>{cls.description}</p>
                <p><strong>Time:</strong> {cls.time}</p>
                <button
                  className={`btn ${selected.includes(cls) ? 'btn-secondary' : 'btn-primary'}`}
                  onClick={() => toggleClass(cls)}
                >
                  {selected.includes(cls) ? 'Selected' : 'Select'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {selected.length > 0 && (
        <div className="mt-4 text-center">
          <p><strong>Subtotal:</strong> ${selected.length * 10}.00</p>
          <button className="btn btn-success" onClick={handleMultiCheckout}>
            Checkout & Pay for {selected.length} class{selected.length > 1 ? 'es' : ''}
          </button>
        </div>
      )}
    </>
  );
};

export default AvailableClasses;
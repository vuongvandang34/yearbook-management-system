import { useEffect, useState } from 'react';

function App() {
  const [form, setForm] = useState({
    customerName: '',
    phone: '',
    date: ''
  });

  const [bookings, setBookings] = useState([]);

  // load bookings
  const fetchBookings = () => {
    fetch('http://localhost:3000/api/bookings')
      .then(res => res.json())
      .then(data => setBookings(data));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // handle input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:3000/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      alert('Booking created!');
      setForm({ customerName: '', phone: '', date: '' });
      fetchBookings();
    } else {
      alert('Error');
    }
  };

  return (
    <div>
      <h1>Yearbook Booking</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <input name="customerName" placeholder="Class name" value={form.customerName} onChange={handleChange} />
        <br />

        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
        <br />

        <input type="date" name="date" value={form.date} onChange={handleChange} />
        <br />

        <button type="submit">Create Booking</button>
      </form>

      <hr />

      {/* LIST */}
      <h2>Booking List</h2>

      {bookings.map(b => (
        <div key={b.id}>
          <p>{b.customerName} - {b.date}</p>
          <p>Status: {b.status}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
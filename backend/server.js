const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let bookings = []; // fake DB

// test
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// CREATE booking
app.post('/api/bookings', (req, res) => {
  const { customerName, phone, date } = req.body;

  if (!customerName || !phone || !date) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const newBooking = {
    id: Date.now(),
    customerName,
    phone,
    date,
    status: 'Pending'
  };

  bookings.push(newBooking);

  res.json(newBooking);
});

// GET bookings
app.get('/api/bookings', (req, res) => {
  res.json(bookings);
});

app.listen(3000, () => {
  console.log('Backend running http://localhost:3000');
});
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/calendar', {
  
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Schema et modèle Mongoose
const eventSchema = new mongoose.Schema({
  day: String,
  title: String
});

const Event = mongoose.model('Event', eventSchema);

// Routes
app.get('/events', async (req, res) => {
  console.log('GET /events request received');
  const events = await Event.find();
  res.json(events);
});

app.post('/events', async (req, res) => {
  console.log('POST /events request received', req.body);
  const event = new Event(req.body);
  await event.save();
  res.json(event);
});

app.delete('/events/:id', async (req, res) => {
  console.log('DELETE /events/:id request received');
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: 'Event deleted' });
});

app.put('/events/:id', async (req, res) => {
  console.log('PUT /events/:id request received');
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(event);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

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



// server.js
const User = require('./models/User'); 

// ...

// Inscription
app.post('/api/register', async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  // Validation simple
  if (!email || !password || password !== confirmPassword) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  // Vérifiez si l'utilisateur existe déjà
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hachage du mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Créer un nouvel utilisateur
  const user = new User({ email, password: hashedPassword });
  await user.save();

  res.status(201).json({ message: 'User registered' });
});

// Connexion
app.post('/api/login', async (req, res) => {

  const { email, password } = req.body;

  console.log('Login attempt:', { email, password });
  // Vérifiez si l'utilisateur existe
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Vérifiez le mot de passe
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Générer un token
  const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
  res.json({ token });
});

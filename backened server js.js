const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/aquaveda', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Models
const User = mongoose.model('User', {
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ['citizen', 'admin', 'manager'], default: 'citizen' },
});

const Report = mongoose.model('Report', {
  userId: mongoose.Schema.Types.ObjectId,
  location: String,
  rating: Number, // 1-5
  description: String,
  image: String, // Base64 or URL
  timestamp: { type: Date, default: Date.now },
});

const Metric = mongoose.model('Metric', {
  location: String,
  ph: Number,
  temperature: Number,
  conductivity: Number,
  turbidity: Number,
  status: { type: String, enum: ['optimal', 'warning', 'critical'], default: 'optimal' },
  lastUpdated: { type: Date, default: Date.now },
});

// Routes
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });
  await user.save();
  res.status(201).json({ message: 'User registered' });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret');
  res.json({ token, user });
});

app.get('/api/metrics', async (req, res) => {
  const metrics = await Metric.find();
  res.json(metrics);
});

app.get('/api/reports', async (req, res) => {
  const reports = await Report.find().populate('userId', 'name');
  res.json(reports);
});

app.post('/api/reports', async (req, res) => {
  const report = new Report(req.body);
  await report.save();
  res.status(201).json(report);
});

// Socket for real-time
io.on('connection', (socket) => {
  console.log('User connected');
  setInterval(() => {
    // Simulate metric updates
    const mockMetric = { location: 'Ganga Source', ph: Math.random() * 14, status: 'warning' };
    io.emit('metricUpdate', mockMetric);
  }, 30000);
});

server.listen(5000, () => console.log('Server running on port 5000'));
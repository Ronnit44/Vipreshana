const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const figlet = require('figlet');
const bcrypt = require('bcrypt');
require('dotenv').config();

const Configs = require('./configs/Configs');
const connectMongoDB = require('./Databases/ConnectDB');
const Controllers = require('./Controllers/index.controllers');
const { otpRateLimiter, otpVerificationRateLimiter } = require('./middleware/rateLimiter');

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = [
  'http://localhost:3000',              // dev frontend
  'https://vipreshana-2.vercel.app'     // deployed frontend
];

// ✅ Updated CORS Configuration
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin); // allow request from this origin
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log(`Origin: ${req.headers.origin}`);
  next();
});

// ✅ MongoDB connection
connectMongoDB(Configs.DB_URI);

if (process.env.MONGO_CONNECTION_STRING) {
  mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => console.log('✨ MongoDB connected successfully ✨'))
    .catch(err => console.error('❌ MongoDB connection failed:', err));
}

// ✅ Mongoose schema
const registrationSchema = new mongoose.Schema({
  name: String,
  phone: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  email: String,
  role: String
}, { collection: 'registrations' });

const Registration = mongoose.models.Registration || mongoose.model('Registration', registrationSchema);

// ✅ Auth routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
console.log('Auth routes are at /api/auth');

// ✅ Basic health check
app.get('/', (req, res) => {
  res.json({
    message: 'Vipreshana Server is running!',
    availableEndpoints: [
      'GET /health - Server health check',
      'GET /api/auth/test - Authentication endpoints'
    ]
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {
      supabase: process.env.REACT_APP_SUPABASE_URL && process.env.REACT_APP_SUPABASE_ANON_KEY ? 'configured' : 'not_configured',
      mongodb: process.env.MONGO_CONNECTION_STRING ? 'configured' : 'not_configured'
    },
    endpoints: {
      auth: '/api/auth'
    }
  });
});

// ✅ User profile routes
app.get('/api/user/profile', Controllers.GetUserProfileController);
app.put('/api/user/profile', Controllers.UpdateUserProfileController);
app.put('/api/user/password', Controllers.UpdateUserPasswordController);

// ✅ OTP routes
app.post('/api/send-otp', otpRateLimiter, Controllers.SendOTPController);
app.post('/api/verify-otp', otpVerificationRateLimiter, Controllers.VerifyOTPController);

// ✅ Auth routes
app.post('/api/register', Controllers.UserRegisterController);
app.post('/api/forgot-password', Controllers.ForgotPasswordController);

// ✅ Bookings
app.post('/api/bookings', Controllers.BookingController);
app.get('/api/bookings/:phone', Controllers.GetBookingByPhoneController);
app.get('/api/details', Controllers.GetAllBookingController);

// ✅ Server test
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running', status: 'ok', timestamp: new Date().toISOString() });
});

// ✅ Login route
app.post('/api/login', async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ message: 'Phone and password are required.' });
    }

    const user = await Registration.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: 'No user found with this phone number.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password. Please try again.' });
    }

    const { password: _, ...safeUser } = user.toObject();
    return res.status(200).json({
      message: 'Login successful!',
      user: safeUser
    });

  } catch (err) {
    console.error('Login error:', err.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// ✅ 404 fallback
app.use((req, res) => {
  console.log(`404 Not Found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    requested: req.originalUrl,
    available_api_base_paths: [
      '/api/auth',
      '/api/test',
      '/health'
    ]
  });
});

// ✅ Error handler
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!', message: err.message });
});

// ✅ Start server
app.listen(PORT, () => {
  figlet('Vipreshana Server', (err, data) => {
    if (err) {
      console.log(`Server started on port ${PORT}`);
    } else {
      console.log(data);
      console.log(`Server is running on port ${PORT}`);
      console.log(`Health check at: http://localhost:${PORT}/health`);
      console.log(`Auth endpoints at: http://localhost:${PORT}/api/auth/`);
    }
  });
});

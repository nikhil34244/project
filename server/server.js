const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/jobportal';
mongoose.connect(mongoURI)
  .then(() => console.log('✓ MongoDB connected successfully'))
  .catch(err => console.error('✗ MongoDB connection error:', err.message));

// User Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  displayName: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    enum: ['jobseeker', 'employer'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// ===== Authentication Routes =====

// Register User
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, displayName, userType } = req.body;

    // Validation
    if (!email || !password || !displayName || !userType) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      email,
      displayName,
      password: hashedPassword,
      userType
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        uid: newUser._id,
        email: newUser.email,
        displayName: newUser.displayName,
        userType: newUser.userType,
        createdAt: newUser.createdAt
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Login User
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      token,
      user: {
        uid: user._id,
        email: user.email,
        displayName: user.displayName,
        userType: user.userType,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Get Current User
app.get('/api/auth/current-user', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      uid: user._id,
      email: user.email,
      displayName: user.displayName,
      userType: user.userType,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update User Profile
app.put('/api/auth/update-profile', verifyToken, async (req, res) => {
  try {
    const { displayName } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { 
        displayName,
        updatedAt: Date.now()
      },
      { new: true }
    ).select('-password');

    res.status(200).json({
      uid: user._id,
      email: user.email,
      displayName: user.displayName,
      userType: user.userType,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Logout (client-side token removal)
app.post('/api/auth/logout', (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
});

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Server is running' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
});

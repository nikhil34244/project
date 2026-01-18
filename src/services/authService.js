import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Register a new user with email, password, and user type
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @param {string} displayName - User's full name
 * @param {string} userType - 'jobseeker' or 'employer'
 */
export const registerUser = async (email, password, displayName, userType) => {
  try {
    const response = await api.post('/auth/register', {
      email,
      password,
      displayName,
      userType,
    });

    // Store token in localStorage
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }

    return response.data.user;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

/**
 * Login user with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 */
export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/auth/login', {
      email,
      password,
    });

    // Store token in localStorage
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
    }

    return response.data.user;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

/**
 * Logout the current user
 */
export const logoutUser = async () => {
  try {
    await api.post('/auth/logout');
    // Remove token from localStorage
    localStorage.removeItem('authToken');
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Get current user data
 */
export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      return null;
    }

    const response = await api.get('/auth/current-user');
    return response.data;
  } catch (error) {
    // Clear token if invalid
    localStorage.removeItem('authToken');
    return null;
  }
};

/**
 * Update user profile
 */
export const updateUserProfile = async (displayName) => {
  try {
    const response = await api.put('/auth/update-profile', {
      displayName,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || error.message);
  }
};

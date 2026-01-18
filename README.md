# 🎯 Job Listing Portal - MongoDB Edition

A **fully functional** Job Listing Portal that connects job seekers with employers using **MongoDB** and **Express.js** backend.

> **NO Firebase!** Just pure MongoDB that your friends already know! 🚀

---

## ✨ Features

✅ **User Authentication** (Register/Login with JWT)  
✅ **Profile Management** (Store user details in MongoDB)  
✅ **Dashboard** (View your registration info)  
✅ **Responsive Design** (Works on all devices)  
✅ **Modern UI** (Advanced styling with gradients & animations)  
✅ **MongoDB Database** (Easy to understand, familiar to developers)  

---

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - Modern UI library
- **React Router 6** - Navigation
- **Axios** - API calls to backend
- **CSS3** - Beautiful styling

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - Database modeling
- **bcryptjs** - Password hashing
- **JWT** - Authentication tokens

---

## 📦 Installation

### Prerequisites
- Node.js v14+ ([Download](https://nodejs.org/))
- MongoDB ([Local](https://www.mongodb.com/try/download/community) or [Cloud Atlas](https://www.mongodb.com/cloud/atlas))

### Clone & Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/job-listing-portal.git
cd job-listing-portal

# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

---

## ⚙️ Configuration

### 1. MongoDB Setup

**Option A: Using MongoDB Atlas (Cloud)**
```
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a free cluster
4. Get connection string
5. Copy to server/.env
```

**Option B: Using Local MongoDB**
```
1. Install MongoDB
2. Start MongoDB (mongod)
3. Use: mongodb://localhost:27017/jobportal
```

### 2. Backend Configuration

Create/Update `server/.env`:
```env
# MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/jobportal
# or
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jobportal

# JWT secret (change to something secure!)
JWT_SECRET=your-super-secret-key-change-this

# Server port
PORT=5000
```

### 3. Frontend Configuration

Your `.env.local` already has:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🚀 Running the Application

### Start Backend (Terminal 1)
```bash
cd server
npm start
```

Expected output:
```
✓ MongoDB connected successfully
✓ Server running on http://localhost:5000
```

### Start Frontend (Terminal 2)
```bash
npm start
```

The app opens at `http://localhost:3000` 🎉

---

## 📱 How to Use

### 1. **Register**
- Click "Register" on the home page
- Fill in: Email, Name, Password, Account Type
- Click "Create Account"

### 2. **Login**
- Enter your email and password
- Click "Login"

### 3. **Dashboard**
- View all your registration details
- See your profile information
- Browse different tabs (Overview, Profile, Activity)

---

## 🗄️ Database Structure

### Users Collection
```javascript
{
  _id: ObjectId,
  email: "user@example.com",
  displayName: "John Doe",
  password: "hashed_with_bcrypt",
  userType: "jobseeker",      // or "employer"
  createdAt: 2024-01-18,
  updatedAt: 2024-01-18
}
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/current-user` | Get logged-in user (requires token) |
| PUT | `/api/auth/update-profile` | Update user profile (requires token) |
| POST | `/api/auth/logout` | Logout user |
| GET | `/api/health` | Health check |

---

## 🔐 Authentication Flow

```
1. User enters credentials
2. Frontend sends to /api/auth/login
3. Backend validates in MongoDB
4. Backend returns JWT token
5. Frontend stores token in localStorage
6. Token sent with every API request
7. Backend verifies token before protected routes
```

---

## 📁 Project Structure

```
job-listing-portal/
├── server/                    # Express.js backend
│   ├── server.js             # Main server with routes
│   ├── package.json          # Backend dependencies
│   └── .env                  # Database config
│
├── src/                      # React frontend
│   ├── services/
│   │   └── authService.js    # MongoDB API calls
│   ├── pages/
│   ├── components/
│   └── styles/
│
├── .env.local                # API URL config
├── package.json              # Frontend dependencies
├── MONGODB_SETUP.md         # Detailed setup guide
└── QUICK_START.md           # Quick start guide
```

---

## 🧪 Testing

### Test Registration
```
Email: test@example.com
Password: test123456
Name: Test User
Type: Job Seeker
```

### View in MongoDB
```bash
mongosh
> use jobportal
> db.users.find()
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| MongoDB connection error | Check connection string & MongoDB is running |
| Port 5000 in use | Change PORT in server/.env |
| API returns 401 | Check JWT token in localStorage |
| Module not found | Run npm install in both directories |

---

## 📚 Resources

- [MongoDB Docs](https://docs.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [React](https://react.dev/)

---

## ✅ Quick Checklist

Before sharing with friends:
- [ ] Node.js installed
- [ ] MongoDB setup (local or Atlas)
- [ ] Both .env files configured
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Can register and login

---

**See `MONGODB_SETUP.md` for detailed instructions!**

Your Firebase-free, MongoDB-powered Job Listing Portal is ready! 🚀
- **Authentication**: Firebase Authentication
- **Hosting**: Can be hosted on any static host (Netlify, Vercel, GitHub Pages, etc.)

## Installation

### Prerequisites
- Node.js and npm (for running live-server)
- Firebase account
- Firebase project created

### Setup Steps

1. **Install Dependencies**
```bash
npm install
```

2. **Update Firebase Configuration**

The Firebase configuration is already set in `public/js/firebaseConfig.js` with your credentials.

3. **Start Development Server**
```bash
npm start
```

The application will run on `http://localhost:3000`

## Project Structure

```
job-listing-portal/
├── public/
│   ├── index.html              # Home page
│   ├── login.html              # Login page
│   ├── register.html           # Registration page
│   ├── dashboard.html          # Dashboard page
│   ├── css/
│   │   └── styles.css          # All styles
│   └── js/
│       ├── firebaseConfig.js   # Firebase setup
│       ├── authService.js      # Auth functions
│       ├── login.js            # Login page logic
│       ├── register.js         # Register page logic
│       ├── dashboard.js        # Dashboard logic
│       └── home.js             # Home page logic
├── package.json
├── .env.local                  # Firebase credentials (local only)
└── README.md
```

## Pages

### 1. **Home Page** (`index.html`)
- Welcome message
- Quick links to login/register
- CTAs for job seekers and employers

### 2. **Login Page** (`login.html`)
- Email and password fields
- Remember me checkbox
- Validation and error messages
- Link to registration

### 3. **Register Page** (`register.html`)
- Email field
- Full name field
- User type selection (Job Seeker/Employer)
- Password and confirm password
- Form validation
- Link to login

### 4. **Dashboard** (`dashboard.html`)
- Welcome message with user name
- User information display
- Logout button
- Protected route (redirects to login if not authenticated)

## How It Works

### Registration Flow
1. User fills registration form
2. Client-side validation checks all fields
3. Firebase creates user account
4. User data stored in Firestore
5. User redirected to dashboard

### Login Flow
1. User enters email and password
2. Firebase authenticates credentials
3. User data fetched from Firestore
4. User redirected to dashboard

### Session Management
- Page load checks if user is authenticated
- Unprotected pages (login, register) redirect to dashboard if already logged in
- Protected pages (dashboard) redirect to login if not authenticated

## Firebase Security Rules (Recommended)

Set these rules in Firestore for security:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

## Features by User Type

### Job Seeker
- View job listings
- Apply for jobs
- Manage applications
- Upload resume
- View recommendations

### Employer
- Post job listings
- Manage postings
- View applications
- Track candidates
- Send notifications

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- No framework overhead
- Fast page loads
- Minimal JavaScript bundle
- Firebase SDK optimized for web

## Security Features

- ✅ Secure Firebase Authentication
- ✅ Protected routes
- ✅ Client-side form validation
- ✅ HTTPS-only communication
- ✅ Firestore security rules
- ✅ Password hashing by Firebase

## Deployment

### Option 1: Netlify
```bash
npm run build
# Upload public/ folder to Netlify
```

### Option 2: Vercel
```bash
vercel deploy --prod
```

### Option 3: GitHub Pages
1. Push to GitHub
2. Enable GitHub Pages in settings
3. Set source to main branch /public folder

## Future Enhancements

- Job listings and search
- Advanced filtering
- Application management
- User profiles
- Notifications system
- Real-time messaging
- Reviews and ratings

## Troubleshooting

**"Firestore is not defined"**
- Make sure Firebase scripts are loaded before your JS files
- Check Firebase configuration

**Login not working**
- Verify Firebase credentials in firebaseConfig.js
- Check Firestore rules allow user creation
- Check browser console for errors

**Users not saving to database**
- Enable Firestore in Firebase Console
- Check Firestore security rules
- Verify user has write permissions

## Support

For Firebase help: [Firebase Documentation](https://firebase.google.com/docs)

## License

MIT

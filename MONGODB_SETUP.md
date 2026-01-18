# 🗄️ MongoDB Setup Guide for Job Listing Portal

Your Job Listing Portal now uses **MongoDB** instead of Firebase! This guide helps you and your friends get MongoDB running.

## ✅ What Changed

✓ **Removed:** Firebase (Authentication, Firestore)  
✓ **Added:** MongoDB + Express.js Backend  
✓ **Added:** JWT Token-based Authentication  
✓ **Benefits:** Free, Open-source, Easy to use with friends

---

## 📋 Prerequisites

Make sure you have installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - Choose one option below

---

## 🚀 MongoDB Installation Options

### Option 1: MongoDB Atlas (Cloud - Easiest) ⭐ **RECOMMENDED**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click **Sign Up Free**
3. Create an account
4. Create a new project
5. Create a cluster (select Free tier)
6. Get your connection string:
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password

7. Update `server/.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/jobportal?retryWrites=true&w=majority
   ```

### Option 2: MongoDB Local (Your Computer)

#### Windows:
1. Download [MongoDB Community Edition](https://www.mongodb.com/try/download/community)
2. Run the installer
3. Choose "Install MongoDB as a Service"
4. Accept defaults
5. MongoDB will start automatically

#### Mac:
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

#### Linux (Ubuntu):
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

---

## 🔧 Setup Instructions

### 1. Install Backend Dependencies

```bash
cd server
npm install
```

### 2. Configure MongoDB Connection

Edit `server/.env`:

```env
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/jobportal

# Or for MongoDB Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/jobportal?retryWrites=true&w=majority

# JWT Secret (change this to something secure)
JWT_SECRET=your-super-secret-key-12345-change-this

# Server Port
PORT=5000
```

### 3. Install Frontend Dependencies

```bash
cd ..
npm install
```

### 4. Verify Frontend Setup

Check `frontend/.env.local`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## ▶️ Running the Application

### Terminal 1: Start MongoDB (if using local MongoDB)

```bash
# Windows
mongod

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Terminal 2: Start the Backend Server

```bash
cd server
npm start
```

You should see:
```
✓ MongoDB connected successfully
✓ Server running on http://localhost:5000
```

### Terminal 3: Start the React Frontend

```bash
npm start
```

The app will open at `http://localhost:3000`

---

## 🧪 Testing the Application

1. **Register**: Create a new account
   - Email: test@example.com
   - Name: Test User
   - Password: test123456
   - Type: Job Seeker or Employer

2. **Login**: Sign in with your credentials

3. **Dashboard**: View your profile details stored in MongoDB

---

## 📁 Project Structure

```
job-listing-portal/
├── server/                 # Express.js backend
│   ├── server.js          # Main server file with routes
│   ├── package.json       # Backend dependencies
│   └── .env               # Database & JWT config
│
├── src/                   # React frontend
│   ├── services/
│   │   └── authService.js # MongoDB API calls (no Firebase!)
│   ├── pages/
│   └── components/
│
└── .env.local            # Frontend API URL
```

---

## 🔐 Security Tips

1. **Change JWT_SECRET** in `server/.env`:
   ```bash
   # Generate a secure key (run in terminal):
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Never commit `.env` files** (already in .gitignore)

3. **For production**, use:
   - Strong passwords for MongoDB
   - HTTPS only
   - Environment variables for secrets

---

## 🐛 Troubleshooting

### "MongoDB connection error"
- Check if MongoDB is running: `mongosh` (MongoDB shell)
- Verify `MONGODB_URI` in `.env`
- For Atlas, check IP whitelist in security settings

### "Cannot find module 'mongoose'"
```bash
cd server
npm install
```

### "Port 5000 already in use"
Change PORT in `server/.env`:
```env
PORT=5001
```

### "API call failed"
- Check backend is running: http://localhost:5000/api/health
- Verify `REACT_APP_API_URL` in `.env.local`

---

## 📚 Database Structure

### Users Collection:
```javascript
{
  _id: ObjectId,
  email: "user@example.com",
  displayName: "John Doe",
  password: "hashed_password",
  userType: "jobseeker" // or "employer"
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔄 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/register` | Create new account |
| POST | `/api/auth/login` | Sign in user |
| POST | `/api/auth/logout` | Sign out user |
| GET | `/api/auth/current-user` | Get logged-in user info |
| PUT | `/api/auth/update-profile` | Update user name |
| GET | `/api/health` | Check server status |

---

## 💡 Next Steps

1. **Share with friends**: They can now use MongoDB without learning Firebase
2. **Add more features**: Job listings, applications, profiles
3. **Deploy**: Heroku (backend) + Vercel (frontend)
4. **Scale**: Add more collections for jobs, applications, etc.

---

## ✨ Benefits of MongoDB vs Firebase

| Feature | MongoDB | Firebase |
|---------|---------|----------|
| Cost | Free (self-hosted) | Free tier limited |
| Learning Curve | Easy | Medium |
| Control | Full control | Limited |
| Scaling | Manual | Automatic |
| Familiar to Friends | ✓ Popular | ✗ Less common |

---

## 📞 Support

- MongoDB Docs: https://docs.mongodb.com/
- Express.js Docs: https://expressjs.com/
- React Docs: https://react.dev/

Happy coding! 🚀

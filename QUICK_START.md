# ⚡ Quick Start - MongoDB Job Listing Portal

## 🏃 5-Minute Setup

### Step 1: Install MongoDB Atlas (Cloud - Recommended)

1. Visit: https://www.mongodb.com/cloud/atlas
2. Sign up (free)
3. Create a free cluster
4. Get your connection string

### Step 2: Update Configuration

Edit `server/.env`:
```
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=any-random-secret-key
PORT=5000
```

Edit `.env.local`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 3: Install Dependencies

```bash
# Install backend
cd server
npm install

# Install frontend
cd ..
npm install
```

### Step 4: Start Everything

**Terminal 1 - Start Backend:**
```bash
cd server
npm start
```

**Terminal 2 - Start Frontend:**
```bash
npm start
```

### Step 5: Test It!

- Open http://localhost:3000
- Register → Login → See Dashboard with your details

---

## 🔧 Commands Reference

| Command | What it does |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm start` | Run the application |
| `npm run dev` | Run with auto-reload (development) |
| `npm build` | Create production build |

---

## 📊 Database Overview

MongoDB stores user data:
```javascript
// User document structure
{
  email: "user@email.com",
  displayName: "Your Name",
  userType: "jobseeker",  // or "employer"
  createdAt: Date,
  updatedAt: Date
  // password is securely hashed with bcrypt
}
```

---

## ❌ No Firebase Anymore!

❌ No Firebase SDK  
❌ No Firestore  
❌ No Firebase Auth  

✅ Pure MongoDB + Express API  
✅ JWT Token Authentication  
✅ Simple & Friends-Friendly  

---

## 🚨 If Something Doesn't Work

1. **Check backend is running**: Visit http://localhost:5000/api/health
2. **Check MongoDB connection**: Look for "✓ MongoDB connected" message
3. **Clear frontend cache**: Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
4. **Check `.env` files**: Both `server/.env` and `.env.local` must be correct

---

## 📞 Need Help?

See `MONGODB_SETUP.md` for detailed instructions!

---

Enjoy your Firebase-free, MongoDB-powered Job Listing Portal! 🎉

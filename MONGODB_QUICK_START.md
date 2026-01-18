# 🚀 MongoDB Setup - Quick Start Guide

## Your Current Situation
✅ **You have:** Firebase + React Frontend  
🔄 **Want:** MongoDB that your friends understand

---

## 🎯 Two Options

### Option 1: Keep Firebase (No Changes Needed)
- Your current setup works fine
- Easier for solo development
- No backend server to manage
- Share [FIREBASE_VS_MONGODB.md](./FIREBASE_VS_MONGODB.md) with friends to explain

### Option 2: Migrate to MongoDB (Friend-Friendly)
- Better for team collaboration
- More familiar to MongoDB users
- Includes Express backend
- More control over data

---

## 📦 What's New - MongoDB Option

I've created a complete MongoDB backend for you:

```
server/                    ← Express.js backend
├── server.js            ← Main app logic
├── package.json         ← Dependencies
└── .env                 ← Configuration

src/services/
└── mongoAuthService.js  ← Frontend MongoDB client
```

---

## 🚀 Quick Start (MongoDB)

### 1️⃣ Install Server Dependencies
```bash
cd server
npm install
```

### 2️⃣ Set Up MongoDB

#### Local (Easy for testing)
```bash
# Download from: mongodb.com/try/download/community
# Windows: Run installer
# Mac: brew install mongodb-community
# Start: mongod
```

#### Cloud - MongoDB Atlas (Recommended for teams)
1. Go to: mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Copy connection string
5. Paste in `server/.env` as `MONGODB_URI`

### 3️⃣ Start Backend
```bash
cd server
npm start
# Server runs on http://localhost:5000
```

### 4️⃣ Update Frontend Config
```bash
# Your frontend already uses Firebase
# When ready to switch, change imports from:
# import { ... } from './authService'
# To:
# import { ... } from './mongoAuthService'
```

### 5️⃣ Start Frontend
```bash
# In root folder
npm start
# Frontend runs on http://localhost:3000
```

---

## 📊 Architecture

```
┌─────────────────────┐
│   React Frontend    │
│  (http://3000)      │
└──────────┬──────────┘
           │
    JSON API Calls
           │
┌──────────▼──────────┐
│  Express Backend    │
│  (http://5000)      │
└──────────┬──────────┘
           │
     Database
           │
┌──────────▼──────────┐
│ MongoDB Database    │
│ (Local or Atlas)    │
└─────────────────────┘
```

---

## 🔑 Key Files for MongoDB

| File | Purpose |
|------|---------|
| `server/server.js` | Main backend API |
| `server/.env` | MongoDB & JWT settings |
| `src/services/mongoAuthService.js` | Frontend authentication |
| `.env.mongodb` | Frontend API URL |
| `MONGODB_MIGRATION_GUIDE.md` | Detailed migration steps |

---

## ✅ MongoDB Features Included

✅ **User Registration** - Email, password, name, account type  
✅ **User Login** - Email/password authentication  
✅ **JWT Tokens** - Secure token-based auth  
✅ **Password Hashing** - bcryptjs (10 rounds)  
✅ **Current User** - Get logged-in user data  
✅ **Profile Update** - Update user information  
✅ **Logout** - Clear authentication  

---

## 🧪 Test MongoDB Backend

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass123","displayName":"John","userType":"jobseeker"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass123"}'

# Check server
curl http://localhost:5000/api/health
```

---

## 🔐 Security Checklist

- [ ] Change `JWT_SECRET` in `server/.env`
- [ ] Use MongoDB Atlas for production
- [ ] Update `MONGODB_URI` for production DB
- [ ] Add API key validation
- [ ] Enable HTTPS on backend
- [ ] Set up rate limiting
- [ ] Add input validation
- [ ] Never commit `.env` files

---

## 📚 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  email: String (unique),
  displayName: String,
  password: String (hashed),
  userType: 'jobseeker' | 'employer',
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🚢 Deployment

### Backend Hosting Options
1. **Heroku** - Free tier (limited)
2. **Railway** - 5$ free credits
3. **Render** - Good documentation
4. **AWS EC2** - Full control
5. **DigitalOcean** - Simple pricing

### Database Hosting
- **MongoDB Atlas** - Official, free tier

### Frontend Hosting
- **Netlify** - Easiest (Recommended)
- **Vercel** - Similar to Netlify
- **GitHub Pages** - Static only
- **AWS S3** - Can be complex

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| MongoDB won't connect | Start mongod / Check MONGODB_URI |
| Port 5000 in use | Kill process: `lsof -i :5000` |
| CORS errors | Enable CORS in server.js |
| Token invalid | Clear localStorage & login |
| Database not created | MongoDB auto-creates on first write |

---

## 📖 Learning Resources

**For Your Friends:**
- MongoDB: https://docs.mongodb.com/
- Mongoose: https://mongoosejs.com/
- Express: https://expressjs.com/
- JWT: https://jwt.io/
- REST APIs: https://restfulapi.net/

---

## 🎯 Next Steps

1. Choose: Keep Firebase OR Migrate to MongoDB
2. If MongoDB:
   - Install server dependencies
   - Set up MongoDB (local or Atlas)
   - Start backend server
   - Update frontend imports
3. Test everything works
4. Deploy when ready

---

## 💡 Firebase vs MongoDB - When to Use

**Keep Firebase if:**
- Solo developer
- Simple project
- No backend complexity
- Need real-time features
- Want serverless

**Switch to MongoDB if:**
- Team project
- Team knows MongoDB
- Need backend control
- Complex queries needed
- More scalability needed

---

**Your Friends Will Love This!** 🎉

MongoDB is much more familiar and they can understand the full architecture. Plus, you have the flexibility of a custom backend!

Questions? Check [MONGODB_MIGRATION_GUIDE.md](./MONGODB_MIGRATION_GUIDE.md)

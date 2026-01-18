# Firebase vs MongoDB - Migration Guide

## 📊 Comparison: Firebase vs MongoDB

### Firebase (What You Currently Have)
✅ **Pros:**
- No backend server needed (Serverless)
- Built-in authentication
- Real-time database (Firestore)
- Easy to set up and deploy
- Good for small to medium projects
- Cloud-hosted (automatic scaling)

❌ **Cons:**
- Vendor lock-in (Google)
- Can be expensive at scale
- Limited query flexibility
- Hard to migrate data later

### MongoDB (What Your Friends Know)
✅ **Pros:**
- Document-based database (JSON-like)
- Flexible schema
- Great for team collaboration
- Easy to understand
- Many hosting options
- Better for complex queries

❌ **Cons:**
- Requires backend server
- Need to manage authentication
- More setup required
- Database administration needed

---

## 🚀 Migration Steps

### Step 1: Install MongoDB Locally or Use MongoDB Atlas

#### Option A: Local MongoDB
```bash
# Download from https://www.mongodb.com/try/download/community
# Windows: Run installer and follow setup
# Mac: brew install mongodb-community
# Linux: Follow MongoDB documentation
```

#### Option B: MongoDB Atlas (Cloud - Recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string
5. Update `.env` file in server folder

### Step 2: Install Server Dependencies

```bash
cd "e:\job listing portal\server"
npm install
```

### Step 3: Start MongoDB

**For Local MongoDB:**
```bash
# Windows: MongoDB should run as service
mongod
```

**For MongoDB Atlas:**
- Just ensure your connection string is in `.env`

### Step 4: Start the Express Backend Server

```bash
cd "e:\job listing portal\server"
npm start
# OR for development with auto-reload:
npm run dev
```

Server will run on: `http://localhost:5000`

### Step 5: Update Frontend Environment

Option 1: Copy `.env.mongodb` to `.env`:
```bash
cp .env.mongodb .env
```

Option 2: Or just add to your existing `.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 6: Switch Frontend to MongoDB Service

Update your imports in components:

**Before (Firebase):**
```javascript
import { loginUser, registerUser } from '../services/authService';
```

**After (MongoDB):**
```javascript
import { loginUser, registerUser } from '../services/mongoAuthService';
```

---

## 📁 Project Structure

```
job-listing-portal/
├── public/
├── src/
│   ├── pages/
│   ├── components/
│   ├── services/
│   │   ├── authService.js          (Firebase - LEGACY)
│   │   ├── mongoAuthService.js     (MongoDB - NEW)
│   │   └── firebaseConfig.js       (Firebase - LEGACY)
│   └── ...
├── server/                          (NEW - Node.js/Express)
│   ├── server.js                   (Main backend file)
│   ├── package.json
│   └── .env                        (MongoDB credentials)
├── .env.firebase                   (Firebase config)
├── .env.mongodb                    (MongoDB config)
└── package.json                    (Frontend)
```

---

## 🔑 Key Differences in Implementation

### User Registration

**Firebase:**
```javascript
const userCredential = await createUserWithEmailAndPassword(auth, email, password);
```

**MongoDB:**
```javascript
const response = await fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  body: JSON.stringify({ email, password, displayName, userType })
});
```

### Getting Current User

**Firebase:**
```javascript
onAuthStateChanged(auth, (user) => { ... })
```

**MongoDB:**
```javascript
const response = await fetch('http://localhost:5000/api/auth/current-user', {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

### Authentication Token

**Firebase:**
- Uses Firebase's built-in token system
- Automatic token refresh

**MongoDB:**
- Uses JWT (JSON Web Tokens)
- Stored in localStorage
- Manual token management

---

## 🛠️ MongoDB Setup Details

### Database Schema

```javascript
// User Collection
{
  _id: ObjectId,
  email: string (unique),
  displayName: string,
  password: string (hashed),
  userType: string ('jobseeker' or 'employer'),
  createdAt: Date,
  updatedAt: Date
}
```

### API Endpoints

```
POST   /api/auth/register          - Create new user
POST   /api/auth/login             - Login user
GET    /api/auth/current-user      - Get logged-in user
PUT    /api/auth/update-profile    - Update profile
POST   /api/auth/logout            - Logout
```

---

## 🔐 Security Considerations

### JWT Token Storage
```javascript
// Store in localStorage
localStorage.setItem('token', data.token);

// Use in requests
headers: {
  'Authorization': `Bearer ${localStorage.getItem('token')}`
}
```

### Password Hashing
- Server uses bcryptjs (10 rounds)
- Never store plain text passwords

### Environment Variables
- Keep `JWT_SECRET` secret
- Never commit `.env` files
- Use different secrets for prod/dev

---

## 🚢 Deployment Options

### Backend Deployment Options

1. **Heroku**
   - Easy, free tier available
   - Good for small projects

2. **Railway**
   - Modern alternative
   - 5$ credits free

3. **Render**
   - Similar to Railway
   - Easy deployment

4. **AWS**
   - EC2 for VPS
   - RDS for managed MongoDB

5. **DigitalOcean**
   - Droplets for VPS
   - Good documentation

### Frontend Deployment

- Netlify (recommend)
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

---

## 📚 MongoDB Atlas Setup (Step by Step)

1. Go to mongodb.com/cloud/atlas
2. Create account → Create organization
3. Create free cluster
4. Add IP address to whitelist
5. Create database user
6. Get connection string
7. Add to server/.env:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jobportal?retryWrites=true&w=majority
   ```

---

## ✅ Migration Checklist

- [ ] Install Node.js dependencies in server folder
- [ ] Set up MongoDB (local or Atlas)
- [ ] Start Express server
- [ ] Update frontend .env file
- [ ] Switch imports to mongoAuthService
- [ ] Test registration
- [ ] Test login
- [ ] Verify user data saves to MongoDB
- [ ] Test profile retrieval
- [ ] Test logout
- [ ] Deploy backend
- [ ] Update frontend API_URL for production

---

## 🆘 Troubleshooting

### "MongoDB connection refused"
- Ensure mongod is running
- Check connection string in .env

### "Token invalid" 
- Clear localStorage and login again
- Check JWT_SECRET matches

### "CORS errors"
- Ensure CORS is enabled in server
- Frontend and backend URLs match

### "Cannot connect to localhost:5000"
- Check if server is running
- Verify port 5000 is not in use

---

## 📖 Resources for Your Friends

- MongoDB Docs: https://docs.mongodb.com/
- Mongoose Docs: https://mongoosejs.com/
- Express Docs: https://expressjs.com/
- JWT Guide: https://jwt.io/introduction
- REST API Best Practices: https://restfulapi.net/

---

## 🎯 Next Steps

1. Choose MongoDB hosting (local or MongoDB Atlas)
2. Install server dependencies
3. Start the backend server
4. Update frontend to use MongoDB service
5. Test the application
6. Deploy!

Your friends will be much more comfortable with MongoDB since it's familiar to them!

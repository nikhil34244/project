# Job Listing Portal - Vanilla JavaScript Version

A modern web application connecting job seekers with employers using **Vanilla JavaScript** (no frameworks).

## Features

### ✅ Task 1: User Authentication
- **User Registration**: Email, password, name, and user type selection
- **User Login**: Email and password authentication
- **User Types**: Support for Job Seekers and Employers
- **Secure Authentication**: Firebase Authentication
- **Session Management**: Automatic session detection
- **Form Validation**: Client-side validation with error messages
- **Remember Me**: Option to save email for next login
- **Responsive Design**: Mobile-friendly pages

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Database**: Firebase Firestore
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

// Authentication Service

/**
 * Register a new user with email and password
 */
async function registerUser(email, password, displayName, userType) {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    await user.updateProfile({
      displayName: displayName
    });

    await db.collection('users').doc(user.uid).set({
      uid: user.uid,
      email: email,
      displayName: displayName,
      userType: userType,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      userType: userType
    };
  } catch (error) {
    throw new Error(`Registration failed: ${error.message}`);
  }
}

/**
 * Login user with email and password
 */
async function loginUser(email, password) {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    const userDoc = await db.collection('users').doc(user.uid).get();
    const userData = userDoc.data();

    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      userType: userData?.userType || 'jobseeker'
    };
  } catch (error) {
    throw new Error(`Login failed: ${error.message}`);
  }
}

/**
 * Logout current user
 */
async function logoutUser() {
  try {
    await auth.signOut();
  } catch (error) {
    throw new Error(`Logout failed: ${error.message}`);
  }
}

/**
 * Get current authenticated user
 */
function getCurrentUser() {
  return new Promise((resolve) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userDoc = await db.collection('users').doc(user.uid).get();
          const userData = userDoc.data();
          resolve({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            userType: userData?.userType || 'jobseeker'
          });
        } catch (error) {
          resolve({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName
          });
        }
      } else {
        resolve(null);
      }
    });
  });
}

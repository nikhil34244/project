# Profile Management Backend Services Documentation

## Overview
This document provides comprehensive documentation for the Profile Management backend services in the Job Listing Portal application.

## Services Included

### 1. **profileService.js**
Main service for managing user profiles (Job Seekers and Employers).

#### Job Seeker Profile Functions

##### `createJobSeekerProfile(userId, profileData)`
Creates or updates a job seeker profile.

**Parameters:**
- `userId` (string): Firebase user ID
- `profileData` (Object): Profile data object

**Profile Fields:**
```javascript
{
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  dateOfBirth: Date,
  gender: string,
  currentCity: string,
  state: string,
  zipCode: string,
  country: string,
  address: string,
  headline: string, // e.g., "Full Stack Developer"
  professionalSummary: string,
  experience: number, // Years
  skills: Array<string>,
  resumeUrl: string,
  resumeFileName: string,
  preferredJobTypes: Array<string>,
  preferredLocations: Array<string>,
  salaryExpectation: number,
  willingToRelocate: boolean,
  openToWork: boolean,
  profilePictureUrl: string,
}
```

**Returns:** Promise<Object> - Updated profile data

**Example:**
```javascript
import { createJobSeekerProfile } from './services/profileService';

const profileData = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phoneNumber: '+1-555-0123',
  headline: 'Full Stack Developer',
  currentCity: 'San Francisco',
  skills: ['React', 'Node.js', 'MongoDB'],
};

try {
  const profile = await createJobSeekerProfile('user123', profileData);
  console.log('Profile created:', profile);
} catch (error) {
  console.error('Error:', error.message);
}
```

##### `getJobSeekerProfile(userId)`
Retrieves a job seeker's profile.

**Parameters:**
- `userId` (string): Firebase user ID

**Returns:** Promise<Object> - Job seeker profile

##### `updateJobSeekerProfile(userId, updateData)`
Updates specific fields in a job seeker profile.

**Parameters:**
- `userId` (string): Firebase user ID
- `updateData` (Object): Fields to update

**Example:**
```javascript
await updateJobSeekerProfile('user123', {
  headline: 'Senior Full Stack Developer',
  experience: 5,
});
```

##### `deleteJobSeekerProfile(userId)`
Deletes a job seeker profile and associated resume files.

**Parameters:**
- `userId` (string): Firebase user ID

**Returns:** Promise<void>

---

#### Employer Profile Functions

##### `createEmployerProfile(userId, profileData)`
Creates or updates an employer profile.

**Parameters:**
- `userId` (string): Firebase user ID
- `profileData` (Object): Profile data object

**Profile Fields:**
```javascript
{
  companyName: string,
  companyType: string,
  industry: string,
  companySize: string, // 'Startup', '10-50', '50-200', etc.
  foundedYear: number,
  website: string,
  companyDescription: string,
  companyLogo: string,
  contactPersonName: string,
  email: string,
  phoneNumber: string,
  alternatePhone: string,
  officeAddress: string,
  city: string,
  state: string,
  zipCode: string,
  country: string,
  registrationNumber: string,
  taxId: string,
  socialMediaLinks: Object, // {linkedin: '', twitter: ''}
  employeesOnPlatform: number,
  jobsPosted: number,
  verified: boolean,
}
```

**Returns:** Promise<Object> - Updated profile data

##### `getEmployerProfile(userId)`
Retrieves an employer's profile.

**Parameters:**
- `userId` (string): Firebase user ID

**Returns:** Promise<Object> - Employer profile

##### `updateEmployerProfile(userId, updateData)`
Updates specific fields in an employer profile.

**Parameters:**
- `userId` (string): Firebase user ID
- `updateData` (Object): Fields to update

##### `deleteEmployerProfile(userId)`
Deletes an employer profile.

**Parameters:**
- `userId` (string): Firebase user ID

**Returns:** Promise<void>

---

#### Resume Management Functions

##### `uploadResume(userId, file)`
Uploads a resume file to Firebase Storage.

**Parameters:**
- `userId` (string): Firebase user ID
- `file` (File): Resume file (PDF, DOC, or DOCX)

**Validation Rules:**
- File types: PDF, Word documents (.doc, .docx)
- Maximum file size: 5MB

**Returns:** Promise<Object>
```javascript
{
  resumeUrl: string,
  fileName: string,
  uploadedAt: Date,
}
```

**Example:**
```javascript
import { uploadResume } from './services/profileService';

const fileInput = document.getElementById('resumeInput');
const file = fileInput.files[0];

try {
  const result = await uploadResume('user123', file);
  console.log('Resume uploaded:', result.resumeUrl);
} catch (error) {
  console.error('Upload failed:', error.message);
}
```

##### `deleteResume(userId, fileName)`
Deletes a resume file.

**Parameters:**
- `userId` (string): Firebase user ID
- `fileName` (string): Name of the file to delete

**Returns:** Promise<void>

---

#### Search & Query Functions

##### `searchJobSeekers(filters)`
Searches for job seekers based on filters.

**Parameters:**
- `filters` (Object):
  ```javascript
  {
    skills: Array<string>,      // e.g., ['React', 'Node.js']
    city: string,               // e.g., 'San Francisco'
    minExp: number,             // Minimum years of experience
  }
  ```

**Returns:** Promise<Array> - Matching job seekers

**Example:**
```javascript
const results = await searchJobSeekers({
  skills: ['React', 'TypeScript'],
  city: 'New York',
  minExp: 3,
});
```

##### `searchEmployers(filters)`
Searches for employers based on filters.

**Parameters:**
- `filters` (Object):
  ```javascript
  {
    industry: string,           // e.g., 'Information Technology'
    companyName: string,        // Partial match
    verified: boolean,          // Only verified companies
  }
  ```

**Returns:** Promise<Array> - Matching employers

##### `getAllJobSeekers(limit, lastDoc)`
Retrieves all job seekers with pagination.

**Parameters:**
- `limit` (number): Number of records to fetch (default: 10)
- `lastDoc` (Object): Last document for pagination

**Returns:** Promise<Array> - Job seeker profiles

##### `getAllEmployers(limit, lastDoc)`
Retrieves all employers with pagination.

**Parameters:**
- `limit` (number): Number of records to fetch (default: 10)
- `lastDoc` (Object): Last document for pagination

**Returns:** Promise<Array> - Employer profiles

---

### 2. **validationService.js**
Validation and utility functions for profile data.

#### Profile Validation Functions

##### `validateJobSeekerProfile(profileData)`
Validates job seeker profile data.

**Returns:** Object
```javascript
{
  isValid: boolean,
  errors: Array<string>,
}
```

**Validation Rules:**
- First name: Required, non-empty
- Last name: Required, non-empty
- Email: Required, valid format
- Phone number: Required, at least 10 digits
- Experience: Must be a positive number
- Date of birth: User must be at least 16 years old

##### `validateEmployerProfile(profileData)`
Validates employer profile data.

**Returns:** Object
```javascript
{
  isValid: boolean,
  errors: Array<string>,
}
```

**Validation Rules:**
- Company name: Required, non-empty
- Email: Required, valid format
- Phone number: Required, at least 10 digits
- Industry: Required, non-empty
- Company size: Must be from predefined options
- Website (if provided): Must be valid URL
- Tax ID (if provided): Alphanumeric, 5-20 characters

#### Utility Validation Functions

##### `isValidEmail(email)`
Validates email format.

##### `isValidPhoneNumber(phoneNumber)`
Validates phone number (minimum 10 digits).

##### `isValidUrl(url)`
Validates URL format.

##### `validateResumeFile(file)`
Validates resume file.

**Returns:** Object
```javascript
{
  isValid: boolean,
  error: string | null,
}
```

##### `calculateProfileCompletion(profile, userType)`
Calculates profile completion percentage.

**Parameters:**
- `profile` (Object): User profile
- `userType` (string): 'jobseeker' or 'employer'

**Returns:** number - Completion percentage (0-100)

---

### 3. **profileHelperService.js**
Helper utilities for profile management.

#### Utility Functions

##### `getEmptyProfile(userType)`
Returns an empty profile template.

**Parameters:**
- `userType` (string): 'jobseeker' or 'employer'

**Returns:** Object - Empty profile template

##### `getProfileCompletionStatus(profile, userType)`
Gets comprehensive profile completion status.

**Returns:** Object
```javascript
{
  percentage: number,
  status: string, // 'Complete', 'Almost Complete', 'In Progress', 'Incomplete'
  missingFields: Array<string>,
}
```

##### `getProfileSummary(profile, userType)`
Gets a summary of profile for display.

**Returns:** Object - Summary object with key information

##### `getJobTypeOptions()`
Returns array of job type options.

##### `getCompanySizeOptions()`
Returns array of company size options.

##### `getIndustryOptions()`
Returns array of industry options.

##### `getCountriesOptions()`
Returns array of country options.

##### `getSkillSuggestions()`
Returns array of common skills suggestions.

##### `getProfileChanges(oldProfile, newProfile)`
Compares two profiles and returns differences.

**Returns:** Object
```javascript
{
  modified: Object,  // Changed fields
  removed: Array,    // Removed fields
  added: Object,     // New fields
}
```

##### `getProfileStatistics(profiles, userType)`
Gets statistics for a collection of profiles.

**Returns:** Object
```javascript
{
  total: number,
  completeProfiles: number,
  incompleteProfiles: number,
  averageCompletionRate: number,
}
```

---

## Firestore Collection Structure

### Job Seekers Collection
```
jobSeekers/
  ├── {userId}/
  │   ├── uid: string
  │   ├── firstName: string
  │   ├── lastName: string
  │   ├── email: string
  │   ├── phoneNumber: string
  │   ├── headline: string
  │   ├── skills: array
  │   ├── experience: number
  │   ├── resumeUrl: string
  │   ├── createdAt: timestamp
  │   ├── updatedAt: timestamp
  │   └── [... other fields]
```

### Employers Collection
```
employers/
  ├── {userId}/
  │   ├── uid: string
  │   ├── companyName: string
  │   ├── industry: string
  │   ├── companySize: string
  │   ├── email: string
  │   ├── phoneNumber: string
  │   ├── website: string
  │   ├── verified: boolean
  │   ├── createdAt: timestamp
  │   ├── updatedAt: timestamp
  │   └── [... other fields]
```

### Firebase Storage Structure
```
resumes/
  ├── {userId}/
  │   ├── {userId}_timestamp_filename.pdf
  │   └── ...
```

---

## Firebase Rules (Security)

Add these rules to your Firestore Security Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Job Seeker profiles - users can read/write their own
    match /jobSeekers/{userId} {
      allow read: if request.auth.uid == userId || request.auth.uid != null;
      allow write: if request.auth.uid == userId;
      allow delete: if request.auth.uid == userId;
    }

    // Employer profiles
    match /employers/{userId} {
      allow read: if request.auth.uid == userId || request.auth.uid != null;
      allow write: if request.auth.uid == userId;
      allow delete: if request.auth.uid == userId;
    }
  }
}
```

Add these rules to your Firebase Storage Rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Resumes - users can upload and delete their own
    match /resumes/{userId}/{allPaths=**} {
      allow read: if request.auth.uid == userId || request.auth.uid != null;
      allow write: if request.auth.uid == userId;
      allow delete: if request.auth.uid == userId;
    }
  }
}
```

---

## Usage Examples

### Complete Job Seeker Profile Setup

```javascript
import { createJobSeekerProfile, uploadResume } from './services/profileService';
import { validateJobSeekerProfile } from './services/validationService';
import { getProfileCompletionStatus } from './services/profileHelperService';

async function setupJobSeekerProfile(userId) {
  // Step 1: Create profile
  const profileData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phoneNumber: '+1-555-0123',
    headline: 'Senior Full Stack Developer',
    currentCity: 'San Francisco',
    experience: 5,
    skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
    preferredJobTypes: ['Full-time', 'Remote'],
    openToWork: true,
  };

  // Validate
  const validation = validateJobSeekerProfile(profileData);
  if (!validation.isValid) {
    console.error('Validation errors:', validation.errors);
    return;
  }

  // Create profile
  const profile = await createJobSeekerProfile(userId, profileData);
  console.log('Profile created:', profile);

  // Step 2: Upload resume
  const fileInput = document.getElementById('resumeInput');
  if (fileInput.files.length > 0) {
    const result = await uploadResume(userId, fileInput.files[0]);
    console.log('Resume uploaded:', result.resumeUrl);
  }

  // Step 3: Check completion status
  const status = getProfileCompletionStatus(profile, 'jobseeker');
  console.log('Profile completion:', status);
}
```

### Search Job Seekers

```javascript
import { searchJobSeekers } from './services/profileService';

async function findCandidates() {
  const candidates = await searchJobSeekers({
    skills: ['React', 'TypeScript'],
    city: 'New York',
    minExp: 3,
  });

  console.log(`Found ${candidates.length} candidates`);
}
```

---

## Error Handling

All functions throw errors with descriptive messages. Always wrap calls in try-catch:

```javascript
try {
  const profile = await getJobSeekerProfile(userId);
} catch (error) {
  console.error('Error:', error.message);
  // Handle error appropriately
}
```

---

## Performance Considerations

1. **Pagination:** Use `getAllJobSeekers()` and `getAllEmployers()` with `limit` parameter for large datasets
2. **Search Optimization:** For complex searches, consider using Algolia or Elasticsearch
3. **Caching:** Implement client-side caching for frequently accessed profiles
4. **Image Optimization:** Compress resume files and profile pictures before upload

---

## Future Enhancements

1. Implement advanced search with Algolia
2. Add profile verification system
3. Implement user activity logging
4. Add email notifications
5. Implement profile recommendations
6. Add social media profile linking
7. Implement job matching algorithm

---

## Support

For issues or questions, refer to the Firebase documentation:
- [Firebase Firestore](https://firebase.google.com/docs/firestore)
- [Firebase Storage](https://firebase.google.com/docs/storage)
- [Firebase Authentication](https://firebase.google.com/docs/auth)

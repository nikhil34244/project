import { doc, setDoc, getDoc, updateDoc, deleteDoc, query, getDocs, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './firebaseConfig';

/**
 * ==================== JOB SEEKER PROFILE FUNCTIONS ====================
 */

/**
 * Create or update job seeker profile
 * @param {string} userId - Firebase user ID
 * @param {Object} profileData - Job seeker profile data
 * @returns {Promise<Object>} - Updated profile data
 */
export const createJobSeekerProfile = async (userId, profileData) => {
  try {
    const jobSeekerRef = doc(db, 'jobSeekers', userId);
    
    const profile = {
      uid: userId,
      // Personal Information
      firstName: profileData.firstName || '',
      lastName: profileData.lastName || '',
      email: profileData.email || '',
      phoneNumber: profileData.phoneNumber || '',
      dateOfBirth: profileData.dateOfBirth || null,
      gender: profileData.gender || '',
      
      // Contact Details
      currentCity: profileData.currentCity || '',
      state: profileData.state || '',
      zipCode: profileData.zipCode || '',
      country: profileData.country || '',
      address: profileData.address || '',
      
      // Professional Information
      headline: profileData.headline || '', // e.g., "Full Stack Developer"
      professionalSummary: profileData.professionalSummary || '',
      experience: profileData.experience || 0, // Years of experience
      skills: profileData.skills || [], // Array of skills
      
      // Resume
      resumeUrl: profileData.resumeUrl || '',
      resumeFileName: profileData.resumeFileName || '',
      
      // Additional Info
      preferredJobTypes: profileData.preferredJobTypes || [], // ['Full-time', 'Part-time', etc.]
      preferredLocations: profileData.preferredLocations || [],
      salaryExpectation: profileData.salaryExpectation || null,
      willingToRelocate: profileData.willingToRelocate || false,
      openToWork: profileData.openToWork || true,
      
      // Metadata
      createdAt: profileData.createdAt || new Date(),
      updatedAt: new Date(),
      profileCompleted: profileData.profileCompleted || false,
      profilePictureUrl: profileData.profilePictureUrl || '',
    };

    await setDoc(jobSeekerRef, profile, { merge: true });
    return profile;
  } catch (error) {
    throw new Error(`Error creating job seeker profile: ${error.message}`);
  }
};

/**
 * Get job seeker profile
 * @param {string} userId - Firebase user ID
 * @returns {Promise<Object>} - Job seeker profile data
 */
export const getJobSeekerProfile = async (userId) => {
  try {
    const jobSeekerRef = doc(db, 'jobSeekers', userId);
    const docSnap = await getDoc(jobSeekerRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error('Job seeker profile not found');
    }
  } catch (error) {
    throw new Error(`Error fetching job seeker profile: ${error.message}`);
  }
};

/**
 * Update job seeker profile
 * @param {string} userId - Firebase user ID
 * @param {Object} updateData - Fields to update
 * @returns {Promise<Object>} - Updated profile data
 */
export const updateJobSeekerProfile = async (userId, updateData) => {
  try {
    const jobSeekerRef = doc(db, 'jobSeekers', userId);
    
    const dataToUpdate = {
      ...updateData,
      updatedAt: new Date(),
    };

    await updateDoc(jobSeekerRef, dataToUpdate);
    
    // Return updated profile
    const updatedDoc = await getDoc(jobSeekerRef);
    return updatedDoc.data();
  } catch (error) {
    throw new Error(`Error updating job seeker profile: ${error.message}`);
  }
};

/**
 * Delete job seeker profile
 * @param {string} userId - Firebase user ID
 * @returns {Promise<void>}
 */
export const deleteJobSeekerProfile = async (userId) => {
  try {
    // Delete resume file if exists
    const profile = await getJobSeekerProfile(userId);
    if (profile.resumeFileName) {
      await deleteResume(userId, profile.resumeFileName);
    }

    const jobSeekerRef = doc(db, 'jobSeekers', userId);
    await deleteDoc(jobSeekerRef);
  } catch (error) {
    throw new Error(`Error deleting job seeker profile: ${error.message}`);
  }
};

/**
 * ==================== EMPLOYER PROFILE FUNCTIONS ====================
 */

/**
 * Create or update employer profile
 * @param {string} userId - Firebase user ID
 * @param {Object} profileData - Employer profile data
 * @returns {Promise<Object>} - Updated profile data
 */
export const createEmployerProfile = async (userId, profileData) => {
  try {
    const employerRef = doc(db, 'employers', userId);
    
    const profile = {
      uid: userId,
      // Company Information
      companyName: profileData.companyName || '',
      companyType: profileData.companyType || '', // e.g., 'IT', 'Healthcare', etc.
      industry: profileData.industry || '',
      companySize: profileData.companySize || '', // 'Startup', '10-50', '50-200', etc.
      foundedYear: profileData.foundedYear || null,
      website: profileData.website || '',
      companyDescription: profileData.companyDescription || '',
      companyLogo: profileData.companyLogo || '',
      
      // Contact Details
      contactPersonName: profileData.contactPersonName || '',
      email: profileData.email || '',
      phoneNumber: profileData.phoneNumber || '',
      alternatePhone: profileData.alternatePhone || '',
      
      // Address
      officeAddress: profileData.officeAddress || '',
      city: profileData.city || '',
      state: profileData.state || '',
      zipCode: profileData.zipCode || '',
      country: profileData.country || '',
      
      // Additional Info
      registrationNumber: profileData.registrationNumber || '', // Tax ID, CRN, etc.
      taxId: profileData.taxId || '',
      socialMediaLinks: profileData.socialMediaLinks || {}, // LinkedIn, Twitter, etc.
      employeesOnPlatform: profileData.employeesOnPlatform || 0,
      jobsPosted: profileData.jobsPosted || 0,
      
      // Metadata
      createdAt: profileData.createdAt || new Date(),
      updatedAt: new Date(),
      profileCompleted: profileData.profileCompleted || false,
      verified: profileData.verified || false,
      verificationDate: profileData.verificationDate || null,
    };

    await setDoc(employerRef, profile, { merge: true });
    return profile;
  } catch (error) {
    throw new Error(`Error creating employer profile: ${error.message}`);
  }
};

/**
 * Get employer profile
 * @param {string} userId - Firebase user ID
 * @returns {Promise<Object>} - Employer profile data
 */
export const getEmployerProfile = async (userId) => {
  try {
    const employerRef = doc(db, 'employers', userId);
    const docSnap = await getDoc(employerRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error('Employer profile not found');
    }
  } catch (error) {
    throw new Error(`Error fetching employer profile: ${error.message}`);
  }
};

/**
 * Update employer profile
 * @param {string} userId - Firebase user ID
 * @param {Object} updateData - Fields to update
 * @returns {Promise<Object>} - Updated profile data
 */
export const updateEmployerProfile = async (userId, updateData) => {
  try {
    const employerRef = doc(db, 'employers', userId);
    
    const dataToUpdate = {
      ...updateData,
      updatedAt: new Date(),
    };

    await updateDoc(employerRef, dataToUpdate);
    
    // Return updated profile
    const updatedDoc = await getDoc(employerRef);
    return updatedDoc.data();
  } catch (error) {
    throw new Error(`Error updating employer profile: ${error.message}`);
  }
};

/**
 * Delete employer profile
 * @param {string} userId - Firebase user ID
 * @returns {Promise<void>}
 */
export const deleteEmployerProfile = async (userId) => {
  try {
    const employerRef = doc(db, 'employers', userId);
    await deleteDoc(employerRef);
  } catch (error) {
    throw new Error(`Error deleting employer profile: ${error.message}`);
  }
};

/**
 * ==================== RESUME MANAGEMENT FUNCTIONS ====================
 */

/**
 * Upload resume file
 * @param {string} userId - Firebase user ID
 * @param {File} file - Resume file to upload
 * @returns {Promise<Object>} - {resumeUrl, fileName}
 */
export const uploadResume = async (userId, file) => {
  try {
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Only PDF and Word documents are allowed');
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error('File size must not exceed 5MB');
    }

    const fileName = `${userId}_${Date.now()}_${file.name}`;
    const resumeRef = ref(storage, `resumes/${userId}/${fileName}`);

    // Upload file
    const snapshot = await uploadBytes(resumeRef, file);
    
    // Get download URL
    const resumeUrl = await getDownloadURL(snapshot.ref);

    // Update job seeker profile with resume URL
    await updateJobSeekerProfile(userId, {
      resumeUrl: resumeUrl,
      resumeFileName: fileName,
    });

    return {
      resumeUrl,
      fileName,
      uploadedAt: new Date(),
    };
  } catch (error) {
    throw new Error(`Error uploading resume: ${error.message}`);
  }
};

/**
 * Delete resume file
 * @param {string} userId - Firebase user ID
 * @param {string} fileName - Name of the file to delete
 * @returns {Promise<void>}
 */
export const deleteResume = async (userId, fileName) => {
  try {
    const resumeRef = ref(storage, `resumes/${userId}/${fileName}`);
    await deleteObject(resumeRef);

    // Update profile to remove resume URL
    await updateJobSeekerProfile(userId, {
      resumeUrl: '',
      resumeFileName: '',
    });
  } catch (error) {
    throw new Error(`Error deleting resume: ${error.message}`);
  }
};

/**
 * ==================== SEARCH & QUERY FUNCTIONS ====================
 */

/**
 * Search job seekers by skills or location
 * @param {Object} filters - {skills: [], city: '', minExp: number}
 * @returns {Promise<Array>} - Array of matching job seekers
 */
export const searchJobSeekers = async (filters = {}) => {
  try {
    let q = query(collection(db, 'jobSeekers'));

    // Note: Firestore has limitations with complex queries
    // For advanced filtering, consider using Algolia or Elasticsearch
    const querySnapshot = await getDocs(q);
    let results = [];

    querySnapshot.forEach((doc) => {
      let profile = doc.data();
      let matches = true;

      // Filter by skills
      if (filters.skills && filters.skills.length > 0) {
        const hasSkill = filters.skills.some(skill =>
          profile.skills && profile.skills.map(s => s.toLowerCase()).includes(skill.toLowerCase())
        );
        matches = matches && hasSkill;
      }

      // Filter by city
      if (filters.city && profile.currentCity?.toLowerCase() !== filters.city.toLowerCase()) {
        matches = matches && false;
      }

      // Filter by minimum experience
      if (filters.minExp !== undefined && profile.experience < filters.minExp) {
        matches = matches && false;
      }

      if (matches) {
        results.push(profile);
      }
    });

    return results;
  } catch (error) {
    throw new Error(`Error searching job seekers: ${error.message}`);
  }
};

/**
 * Search employers by company name or industry
 * @param {Object} filters - {industry: '', companyName: ''}
 * @returns {Promise<Array>} - Array of matching employers
 */
export const searchEmployers = async (filters = {}) => {
  try {
    let q = query(collection(db, 'employers'));

    const querySnapshot = await getDocs(q);
    let results = [];

    querySnapshot.forEach((doc) => {
      let profile = doc.data();
      let matches = true;

      // Filter by industry
      if (filters.industry && profile.industry?.toLowerCase() !== filters.industry.toLowerCase()) {
        matches = matches && false;
      }

      // Filter by company name (partial match)
      if (filters.companyName) {
        const nameMatch = profile.companyName?.toLowerCase().includes(filters.companyName.toLowerCase());
        matches = matches && nameMatch;
      }

      // Filter by verified status
      if (filters.verified !== undefined && profile.verified !== filters.verified) {
        matches = matches && false;
      }

      if (matches) {
        results.push(profile);
      }
    });

    return results;
  } catch (error) {
    throw new Error(`Error searching employers: ${error.message}`);
  }
};

/**
 * Get all job seekers (paginated)
 * @param {number} limit - Number of records to fetch
 * @param {Object} lastDoc - Last document for pagination
 * @returns {Promise<Array>} - Array of job seeker profiles
 */
export const getAllJobSeekers = async (limit = 10, lastDoc = null) => {
  try {
    let q = query(collection(db, 'jobSeekers'));
    
    const querySnapshot = await getDocs(q);
    const results = [];

    querySnapshot.forEach((doc) => {
      results.push(doc.data());
    });

    return results.slice(0, limit);
  } catch (error) {
    throw new Error(`Error fetching job seekers: ${error.message}`);
  }
};

/**
 * Get all employers (paginated)
 * @param {number} limit - Number of records to fetch
 * @param {Object} lastDoc - Last document for pagination
 * @returns {Promise<Array>} - Array of employer profiles
 */
export const getAllEmployers = async (limit = 10, lastDoc = null) => {
  try {
    let q = query(collection(db, 'employers'));
    
    const querySnapshot = await getDocs(q);
    const results = [];

    querySnapshot.forEach((doc) => {
      results.push(doc.data());
    });

    return results.slice(0, limit);
  } catch (error) {
    throw new Error(`Error fetching employers: ${error.message}`);
  }
};

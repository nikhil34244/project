/**
 * Helper utilities for Profile Management
 */

import { calculateProfileCompletion } from './validationService';

/**
 * Get profile data based on user type
 * @param {string} userType - 'jobseeker' or 'employer'
 * @returns {Object} - Empty profile template
 */
export const getEmptyProfile = (userType) => {
  if (userType === 'jobseeker') {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      dateOfBirth: null,
      gender: '',
      currentCity: '',
      state: '',
      zipCode: '',
      country: '',
      address: '',
      headline: '',
      professionalSummary: '',
      experience: 0,
      skills: [],
      resumeUrl: '',
      resumeFileName: '',
      preferredJobTypes: [],
      preferredLocations: [],
      salaryExpectation: null,
      willingToRelocate: false,
      openToWork: true,
      profilePictureUrl: '',
    };
  } else if (userType === 'employer') {
    return {
      companyName: '',
      companyType: '',
      industry: '',
      companySize: '',
      foundedYear: null,
      website: '',
      companyDescription: '',
      companyLogo: '',
      contactPersonName: '',
      email: '',
      phoneNumber: '',
      alternatePhone: '',
      officeAddress: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      registrationNumber: '',
      taxId: '',
      socialMediaLinks: {},
      employeesOnPlatform: 0,
      jobsPosted: 0,
    };
  }

  return {};
};

/**
 * Get profile completion status
 * @param {Object} profile - User profile
 * @param {string} userType - 'jobseeker' or 'employer'
 * @returns {Object} - {percentage: number, status: string, missingFields: array}
 */
export const getProfileCompletionStatus = (profile, userType) => {
  const percentage = calculateProfileCompletion(profile, userType);
  
  let status = 'Incomplete';
  if (percentage === 100) {
    status = 'Complete';
  } else if (percentage >= 75) {
    status = 'Almost Complete';
  } else if (percentage >= 50) {
    status = 'In Progress';
  }

  const missingFields = getMissingFields(profile, userType);

  return {
    percentage,
    status,
    missingFields,
  };
};

/**
 * Get missing required and important fields
 * @param {Object} profile - User profile
 * @param {string} userType - 'jobseeker' or 'employer'
 * @returns {Array} - Array of missing field names
 */
export const getMissingFields = (profile, userType) => {
  const missing = [];

  if (userType === 'jobseeker') {
    const requiredFields = ['firstName', 'lastName', 'email', 'phoneNumber', 'headline', 'currentCity'];
    requiredFields.forEach((field) => {
      if (!profile[field] || profile[field].toString().trim() === '') {
        missing.push(formatFieldName(field));
      }
    });
  } else if (userType === 'employer') {
    const requiredFields = ['companyName', 'email', 'phoneNumber', 'industry', 'companySize'];
    requiredFields.forEach((field) => {
      if (!profile[field] || profile[field].toString().trim() === '') {
        missing.push(formatFieldName(field));
      }
    });
  }

  return missing;
};

/**
 * Format field name for display
 * @param {string} fieldName - Field name in camelCase
 * @returns {string} - Formatted field name
 */
export const formatFieldName = (fieldName) => {
  return fieldName
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
};

/**
 * Get profile summary for display
 * @param {Object} profile - User profile
 * @param {string} userType - 'jobseeker' or 'employer'
 * @returns {Object} - Summary object
 */
export const getProfileSummary = (profile, userType) => {
  if (userType === 'jobseeker') {
    return {
      name: `${profile.firstName} ${profile.lastName}`.trim(),
      headline: profile.headline,
      location: `${profile.currentCity}, ${profile.state}`.trim(),
      experience: `${profile.experience} years`,
      skills: profile.skills?.length || 0,
      hasResume: !!profile.resumeUrl,
      profilePicture: profile.profilePictureUrl,
    };
  } else if (userType === 'employer') {
    return {
      companyName: profile.companyName,
      industry: profile.industry,
      companySize: profile.companySize,
      location: `${profile.city}, ${profile.state}`.trim(),
      website: profile.website,
      jobsPosted: profile.jobsPosted || 0,
      verified: profile.verified || false,
      logo: profile.companyLogo,
    };
  }

  return {};
};

/**
 * Export profile data to JSON
 * @param {Object} profile - Profile object
 * @param {string} userType - 'jobseeker' or 'employer'
 * @returns {string} - JSON string
 */
export const exportProfileToJSON = (profile, userType) => {
  const exportData = {
    userType,
    exportedAt: new Date().toISOString(),
    profile: { ...profile },
  };

  return JSON.stringify(exportData, null, 2);
};

/**
 * Compare two profiles and return differences
 * @param {Object} oldProfile - Old profile
 * @param {Object} newProfile - New profile
 * @returns {Object} - Changes object
 */
export const getProfileChanges = (oldProfile, newProfile) => {
  const changes = {
    modified: {},
    removed: [],
    added: {},
  };

  // Check for modified and removed fields
  Object.keys(oldProfile).forEach((key) => {
    const oldValue = oldProfile[key];
    const newValue = newProfile[key];

    if (newValue === undefined) {
      changes.removed.push(key);
    } else if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
      changes.modified[key] = {
        oldValue,
        newValue,
      };
    }
  });

  // Check for added fields
  Object.keys(newProfile).forEach((key) => {
    if (oldProfile[key] === undefined) {
      changes.added[key] = newProfile[key];
    }
  });

  return changes;
};

/**
 * Get job types options
 * @returns {Array} - Array of job type options
 */
export const getJobTypeOptions = () => {
  return ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship', 'Freelance'];
};

/**
 * Get company size options
 * @returns {Array} - Array of company size options
 */
export const getCompanySizeOptions = () => {
  return ['Startup', '10-50', '50-200', '200-500', '500-1000', '1000-5000', '5000+'];
};

/**
 * Get industry options
 * @returns {Array} - Array of industry options
 */
export const getIndustryOptions = () => {
  return [
    'Information Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Retail',
    'Manufacturing',
    'Real Estate',
    'Construction',
    'Transportation',
    'Hospitality',
    'Entertainment',
    'Media',
    'Telecommunications',
    'Energy',
    'Utilities',
    'Other',
  ];
};

/**
 * Get common skills suggestions (can be enhanced with data from backend)
 * @returns {Array} - Array of common skills
 */
export const getSkillSuggestions = () => {
  return [
    'JavaScript',
    'Python',
    'Java',
    'C++',
    'React',
    'Node.js',
    'MongoDB',
    'SQL',
    'Cloud Computing',
    'Machine Learning',
    'Data Analysis',
    'Project Management',
    'Leadership',
    'Communication',
    'Problem Solving',
    'Time Management',
    'Team Collaboration',
    'Sales',
    'Marketing',
    'Customer Service',
  ];
};

/**
 * Get gender options
 * @returns {Array} - Array of gender options
 */
export const getGenderOptions = () => {
  return ['Male', 'Female', 'Non-binary', 'Prefer not to say'];
};

/**
 * Get countries list (top countries)
 * @returns {Array} - Array of countries
 */
export const getCountriesOptions = () => {
  return [
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'India',
    'Germany',
    'France',
    'Japan',
    'China',
    'Brazil',
    'Mexico',
    'Spain',
    'Italy',
    'South Korea',
    'Singapore',
    'UAE',
    'Other',
  ];
};

/**
 * Merge profile data with validation
 * @param {Object} existingProfile - Existing profile
 * @param {Object} newData - New data to merge
 * @returns {Object} - Merged profile
 */
export const mergeProfileData = (existingProfile, newData) => {
  const merged = { ...existingProfile };

  Object.keys(newData).forEach((key) => {
    if (newData[key] !== null && newData[key] !== undefined && newData[key] !== '') {
      merged[key] = newData[key];
    }
  });

  return merged;
};

/**
 * Get profile statistics
 * @param {Array} profiles - Array of profiles
 * @param {string} userType - 'jobseeker' or 'employer'
 * @returns {Object} - Statistics object
 */
export const getProfileStatistics = (profiles, userType) => {
  if (!profiles || profiles.length === 0) {
    return {
      total: 0,
      completeProfiles: 0,
      incompleteProfiles: 0,
      averageCompletionRate: 0,
    };
  }

  const total = profiles.length;
  let completeProfiles = 0;
  let totalCompletion = 0;

  profiles.forEach((profile) => {
    const completion = calculateProfileCompletion(profile, userType);
    totalCompletion += completion;

    if (completion === 100) {
      completeProfiles++;
    }
  });

  return {
    total,
    completeProfiles,
    incompleteProfiles: total - completeProfiles,
    averageCompletionRate: Math.round(totalCompletion / total),
  };
};

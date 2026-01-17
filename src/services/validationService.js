/**
 * Validation functions for Profile Management
 */

/**
 * Validate job seeker profile data
 * @param {Object} profileData - Job seeker profile data to validate
 * @returns {Object} - {isValid: boolean, errors: array}
 */
export const validateJobSeekerProfile = (profileData) => {
  const errors = [];

  // Check required fields
  if (!profileData.firstName || profileData.firstName.trim() === '') {
    errors.push('First name is required');
  }

  if (!profileData.lastName || profileData.lastName.trim() === '') {
    errors.push('Last name is required');
  }

  if (!profileData.email || !isValidEmail(profileData.email)) {
    errors.push('Valid email is required');
  }

  if (!profileData.phoneNumber || !isValidPhoneNumber(profileData.phoneNumber)) {
    errors.push('Valid phone number is required');
  }

  // Optional field validations
  if (profileData.experience && (isNaN(profileData.experience) || profileData.experience < 0)) {
    errors.push('Experience must be a positive number');
  }

  if (profileData.salaryExpectation && (isNaN(profileData.salaryExpectation) || profileData.salaryExpectation < 0)) {
    errors.push('Salary expectation must be a positive number');
  }

  if (profileData.dateOfBirth) {
    const age = calculateAge(profileData.dateOfBirth);
    if (age < 16) {
      errors.push('You must be at least 16 years old');
    }
  }

  // Validate skills array
  if (profileData.skills && !Array.isArray(profileData.skills)) {
    errors.push('Skills must be an array');
  }

  // Validate job types array
  if (profileData.preferredJobTypes && !Array.isArray(profileData.preferredJobTypes)) {
    errors.push('Preferred job types must be an array');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate employer profile data
 * @param {Object} profileData - Employer profile data to validate
 * @returns {Object} - {isValid: boolean, errors: array}
 */
export const validateEmployerProfile = (profileData) => {
  const errors = [];

  // Check required fields
  if (!profileData.companyName || profileData.companyName.trim() === '') {
    errors.push('Company name is required');
  }

  if (!profileData.email || !isValidEmail(profileData.email)) {
    errors.push('Valid email is required');
  }

  if (!profileData.phoneNumber || !isValidPhoneNumber(profileData.phoneNumber)) {
    errors.push('Valid phone number is required');
  }

  if (!profileData.industry || profileData.industry.trim() === '') {
    errors.push('Industry is required');
  }

  // Validate optional fields
  if (profileData.website && !isValidUrl(profileData.website)) {
    errors.push('Website must be a valid URL');
  }

  if (profileData.foundedYear) {
    const year = parseInt(profileData.foundedYear);
    const currentYear = new Date().getFullYear();
    if (isNaN(year) || year < 1800 || year > currentYear) {
      errors.push('Founded year must be a valid year');
    }
  }

  if (profileData.companySize && !isValidCompanySize(profileData.companySize)) {
    errors.push('Invalid company size');
  }

  // Validate tax ID format (basic validation)
  if (profileData.taxId && !isValidTaxId(profileData.taxId)) {
    errors.push('Invalid tax ID format');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number format
 * @param {string} phoneNumber - Phone number to validate
 * @returns {boolean}
 */
export const isValidPhoneNumber = (phoneNumber) => {
  // Basic validation: at least 10 digits
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  return digitsOnly.length >= 10;
};

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean}
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate company size
 * @param {string} size - Company size category
 * @returns {boolean}
 */
export const isValidCompanySize = (size) => {
  const validSizes = ['Startup', '10-50', '50-200', '200-500', '500-1000', '1000-5000', '5000+'];
  return validSizes.includes(size);
};

/**
 * Validate tax ID format (basic validation)
 * @param {string} taxId - Tax ID to validate
 * @returns {boolean}
 */
export const isValidTaxId = (taxId) => {
  // Basic validation: must be alphanumeric with 5-20 characters
  const taxIdRegex = /^[a-zA-Z0-9-]{5,20}$/;
  return taxIdRegex.test(taxId);
};

/**
 * Calculate age from date of birth
 * @param {Date|string} dateOfBirth - Date of birth
 * @returns {number} - Age in years
 */
export const calculateAge = (dateOfBirth) => {
  const today = new Date();
  let dob = new Date(dateOfBirth);
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  return age;
};

/**
 * Validate resume file
 * @param {File} file - Resume file to validate
 * @returns {Object} - {isValid: boolean, error: string}
 */
export const validateResumeFile = (file) => {
  // Check file type
  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: 'Only PDF and Word documents (.pdf, .doc, .docx) are allowed',
    };
  }

  // Check file size (max 5MB)
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'File size must not exceed 5MB',
    };
  }

  return {
    isValid: true,
    error: null,
  };
};

/**
 * Check profile completion percentage
 * @param {Object} profile - Job seeker or employer profile
 * @param {string} userType - 'jobseeker' or 'employer'
 * @returns {number} - Completion percentage (0-100)
 */
export const calculateProfileCompletion = (profile, userType) => {
  let completedFields = 0;
  let totalFields = 0;

  if (userType === 'jobseeker') {
    // Job seeker required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phoneNumber', 'headline', 'currentCity'];
    const optionalFields = ['professionalSummary', 'skills', 'resumeUrl', 'experience'];

    totalFields = requiredFields.length + optionalFields.length;

    requiredFields.forEach((field) => {
      if (profile[field] && profile[field].toString().trim() !== '') {
        completedFields++;
      }
    });

    optionalFields.forEach((field) => {
      if (profile[field]) {
        if (Array.isArray(profile[field]) && profile[field].length > 0) {
          completedFields++;
        } else if (!Array.isArray(profile[field]) && profile[field].toString().trim() !== '') {
          completedFields++;
        }
      }
    });
  } else if (userType === 'employer') {
    // Employer required fields
    const requiredFields = ['companyName', 'email', 'phoneNumber', 'industry', 'companySize'];
    const optionalFields = ['website', 'companyDescription', 'companyLogo', 'officeAddress'];

    totalFields = requiredFields.length + optionalFields.length;

    requiredFields.forEach((field) => {
      if (profile[field] && profile[field].toString().trim() !== '') {
        completedFields++;
      }
    });

    optionalFields.forEach((field) => {
      if (profile[field] && profile[field].toString().trim() !== '') {
        completedFields++;
      }
    });
  }

  return totalFields > 0 ? Math.round((completedFields / totalFields) * 100) : 0;
};

/**
 * Sanitize user input
 * @param {string} input - Input string to sanitize
 * @returns {string} - Sanitized string
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets
    .substring(0, 255); // Limit length
};

/**
 * Format phone number
 * @param {string} phoneNumber - Phone number to format
 * @returns {string} - Formatted phone number
 */
export const formatPhoneNumber = (phoneNumber) => {
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  
  if (digitsOnly.length === 10) {
    return `(${digitsOnly.slice(0, 3)}) ${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6)}`;
  } else if (digitsOnly.length === 11 && digitsOnly[0] === '1') {
    return `+1 (${digitsOnly.slice(1, 4)}) ${digitsOnly.slice(4, 7)}-${digitsOnly.slice(7)}`;
  }
  
  return phoneNumber;
};

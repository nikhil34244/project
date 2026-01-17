import React, { useState } from 'react';
import { uploadResume, deleteResume } from '../services/profileService';
import { validateResumeFile } from '../services/validationService';
import '../styles/ResumeUpload.css';

const ResumeUpload = ({ userId, currentResumeUrl, currentResumeFileName, onUpload, onDelete }) => {
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file) => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Validate file
      const validation = validateResumeFile(file);
      if (!validation.isValid) {
        setError(validation.error);
        setLoading(false);
        return;
      }

      // Upload resume
      const result = await uploadResume(userId, file);
      setSuccess('Resume uploaded successfully!');

      if (onUpload) {
        onUpload(result);
      }

      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to upload resume');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!currentResumeFileName) return;

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await deleteResume(userId, currentResumeFileName);
      setSuccess('Resume deleted successfully!');

      if (onDelete) {
        onDelete();
      }

      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to delete resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-upload-container">
      <div className="resume-header">
        <h3>📄 Resume Upload</h3>
        <p className="resume-subtitle">Upload your resume (PDF or Word document, max 5MB)</p>
      </div>

      {error && (
        <div className="alert alert-error">
          <span className="alert-icon">⚠️</span>
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          <span className="alert-icon">✓</span>
          {success}
        </div>
      )}

      {currentResumeUrl ? (
        <div className="resume-uploaded">
          <div className="resume-info">
            <div className="resume-icon">📋</div>
            <div className="resume-details">
              <p className="resume-name">{currentResumeFileName || 'Resume'}</p>
              <p className="resume-status">Resume uploaded</p>
            </div>
          </div>
          <div className="resume-actions">
            <a
              href={currentResumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              download
            >
              Download
            </a>
            <button
              onClick={handleDelete}
              className="btn-danger"
              disabled={loading}
            >
              {loading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`resume-dropzone ${dragActive ? 'active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="dropzone-content">
            <div className="dropzone-icon">📤</div>
            <h4>Drag and drop your resume here</h4>
            <p>or</p>
            <label htmlFor="resumeInput" className="btn-primary">
              Browse Files
            </label>
            <input
              id="resumeInput"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              disabled={loading}
              style={{ display: 'none' }}
            />
            <p className="dropzone-hint">PDF or Word documents only (Max 5MB)</p>
          </div>
        </div>
      )}

      <div className="resume-tips">
        <h4>📝 Resume Tips:</h4>
        <ul>
          <li>Keep your resume updated with your latest experience</li>
          <li>Use clear formatting and professional fonts</li>
          <li>Include relevant skills and achievements</li>
          <li>Ensure all contact information is correct</li>
          <li>Proofread for spelling and grammar errors</li>
        </ul>
      </div>
    </div>
  );
};

export default ResumeUpload;

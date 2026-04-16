import React, { useState } from 'react';
import styles from './MessageModal.module.css';

const MessageModal = ({ lawyer, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    legalIssue: '',
    urgency: 'normal',
    preferredTime: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Auto close after success message
      setTimeout(() => {
        onClose();
      }, 3000);
    }, 2000);
  };

  if (!lawyer) return null;

  if (isSubmitted) {
    return (
      <div className={styles.messageOverlay} onClick={onClose}>
        <div className={styles.messageContent} onClick={(e) => e.stopPropagation()}>
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>
              <i className="fas fa-check-circle"></i>
            </div>
            <h3>Message Sent Successfully!</h3>
            <p>
              Your message has been sent to <strong>{lawyer.name}</strong>. 
              You can expect a response within 2-4 hours during business hours.
            </p>
            <p className={styles.contactInfo}>
              You can also reach them directly at <strong>{lawyer.phone}</strong>
            </p>
            <button className={styles.closeSuccessButton} onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.messageOverlay} onClick={onClose}>
      <div className={styles.messageContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.messageHeader}>
          <div className={styles.lawyerInfo}>
            <img src={lawyer.image} alt={lawyer.name} className={styles.lawyerAvatar} />
            <div>
              <h3>Contact {lawyer.name}</h3>
              <p>{lawyer.specialization}</p>
            </div>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form className={styles.messageForm} onSubmit={handleSubmit}>
          <div className={styles.formSection}>
            <h4>Your Information</h4>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                />
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div className={styles.formSection}>
            <h4>Legal Consultation Details</h4>
            <div className={styles.formGroup}>
              <label htmlFor="legalIssue">Type of Legal Issue *</label>
              <select
                id="legalIssue"
                name="legalIssue"
                value={formData.legalIssue}
                onChange={handleChange}
                required
              >
                <option value="">Select legal issue type</option>
                <option value="family">Family Law / Divorce</option>
                <option value="criminal">Criminal Law</option>
                <option value="property">Property / Real Estate</option>
                <option value="consumer">Consumer Rights</option>
                <option value="employment">Employment / Labour</option>
                <option value="civil">Civil Disputes</option>
                <option value="corporate">Corporate / Business</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="urgency">Urgency Level</label>
                <select
                  id="urgency"
                  name="urgency"
                  value={formData.urgency}
                  onChange={handleChange}
                >
                  <option value="low">Low - General inquiry</option>
                  <option value="normal">Normal - Need consultation soon</option>
                  <option value="high">High - Urgent matter</option>
                  <option value="emergency">Emergency - Immediate help needed</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="preferredTime">Preferred Consultation Time</label>
                <select
                  id="preferredTime"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                >
                  <option value="">No preference</option>
                  <option value="morning">Morning (9 AM - 12 PM)</option>
                  <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                  <option value="evening">Evening (5 PM - 8 PM)</option>
                  <option value="weekend">Weekend</option>
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">Describe Your Legal Issue *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Please provide a brief description of your legal issue, any relevant details, and specific questions you have..."
              />
            </div>
          </div>

          <div className={styles.formFooter}>
            <div className={styles.privacyNote}>
              <i className="fas fa-shield-alt"></i>
              <span>All information is confidential and protected by attorney-client privilege</span>
            </div>
            <div className={styles.formActions}>
              <button type="button" className={styles.cancelButton} onClick={onClose}>
                Cancel
              </button>
              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i>
                    Sending...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i>
                    Send Message
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessageModal;

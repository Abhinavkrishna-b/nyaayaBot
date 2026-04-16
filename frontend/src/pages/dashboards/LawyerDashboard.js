import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import TranslatableText from '../../components/TranslatableText';
import styles from './LawyerDashboard.module.css';

const LawyerDashboard = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [consultationRequests, setConsultationRequests] = useState([]);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [lawyerProfile, setLawyerProfile] = useState({
    profilePhoto: null,
    clinicName: '',
    address: '',
    contactEmail: '',
    workingDays: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false
    },
    openingTime: '09:00',
    closingTime: '17:00'
  });

  // Redirect to home if not authenticated or not a lawyer
  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'lawyer') {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Mock data for consultation requests - replace with actual API calls
  useEffect(() => {
    setConsultationRequests([
      {
        id: 'REQ001',
        userId: 'USER001',
        userName: 'Rajesh Kumar',
        userEmail: 'rajesh@email.com',
        subject: 'Property Dispute Legal Advice',
        description: 'I am facing a boundary dispute with my neighbor. They have constructed a wall that encroaches on my property. I need legal guidance on how to proceed.',
        requestDate: '2024-08-15',
        status: 'pending', // pending, accepted, in_consultation, completed
        consultationType: 'free_30min',
        urgency: 'medium'
      },
      {
        id: 'REQ002',
        userId: 'USER002',
        userName: 'Priya Sharma',
        userEmail: 'priya@email.com',
        subject: 'Employment Contract Review',
        description: 'I need help reviewing my employment contract. There are some clauses I don\'t understand and want to ensure my rights are protected.',
        requestDate: '2024-08-14',
        status: 'accepted',
        consultationType: 'free_30min',
        urgency: 'low'
      },
      {
        id: 'REQ003',
        userId: 'USER003',
        userName: 'Amit Singh',
        userEmail: 'amit@email.com',
        subject: 'Consumer Rights Issue',
        description: 'I purchased a defective product and the company is refusing to provide a refund or replacement. What are my legal options?',
        requestDate: '2024-08-13',
        status: 'completed',
        consultationType: 'free_30min',
        urgency: 'high'
      }
    ]);

    // Mock messages for accepted consultations
    setMessages([
      {
        id: 1,
        consultationId: 'REQ002',
        senderId: 'USER002',
        senderName: 'Priya Sharma',
        message: 'Hello, thank you for accepting my consultation request. When would be a good time for our 30-minute session?',
        timestamp: '2024-08-14 10:30 AM',
        type: 'user'
      },
      {
        id: 2,
        consultationId: 'REQ002',
        senderId: user?.id,
        senderName: user?.name,
        message: 'Hello Priya, I would be happy to help you with your employment contract. I am available tomorrow at 2 PM or Friday at 11 AM. Which time works better for you?',
        timestamp: '2024-08-14 11:15 AM',
        type: 'lawyer'
      },
      {
        id: 3,
        consultationId: 'REQ002',
        senderId: 'USER002',
        senderName: 'Priya Sharma',
        message: 'Friday at 11 AM works perfectly for me. Should I prepare any specific documents for our discussion?',
        timestamp: '2024-08-14 11:45 AM',
        type: 'user'
      }
    ]);
  }, [user]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ffc107';
      case 'accepted': return '#0056b3';
      case 'in_consultation': return '#17a2b8';
      case 'completed': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return '#dc3545';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  const handleAcceptConsultation = (consultationId) => {
    setConsultationRequests(prev => 
      prev.map(req => 
        req.id === consultationId 
          ? { ...req, status: 'accepted' }
          : req
      )
    );
  };

  const handleCompleteConsultation = (consultationId) => {
    setConsultationRequests(prev => 
      prev.map(req => 
        req.id === consultationId 
          ? { ...req, status: 'completed' }
          : req
      )
    );
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConsultation) return;

    const message = {
      id: Date.now(),
      consultationId: selectedConsultation.id,
      senderId: user?.id,
      senderName: user?.name,
      message: newMessage,
      timestamp: new Date().toLocaleString(),
      type: 'lawyer'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const handleProfileSave = () => {
    // Save profile logic here - API call
    alert('Profile updated successfully!');
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLawyerProfile(prev => ({
          ...prev,
          profilePhoto: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const renderOverview = () => (
    <div className={styles.overviewContent}>
      <div className={styles.welcomeSection}>
        <h2>Welcome back, {user?.name}!</h2>
        <p>Manage your consultation requests and help users with their legal needs.</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <i className="fas fa-clock" style={{color: '#ffc107'}}></i>
          </div>
          <div className={styles.statInfo}>
            <h3>{consultationRequests.filter(req => req.status === 'pending').length}</h3>
            <p><TranslatableText text="Pending Requests" /></p>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <i className="fas fa-handshake" style={{color: '#0056b3'}}></i>
          </div>
          <div className={styles.statInfo}>
            <h3>{consultationRequests.filter(req => req.status === 'accepted').length}</h3>
            <p><TranslatableText text="Active Consultations" /></p>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <i className="fas fa-check-circle" style={{color: '#28a745'}}></i>
          </div>
          <div className={styles.statInfo}>
            <h3>{consultationRequests.filter(req => req.status === 'completed').length}</h3>
            <p><TranslatableText text="Completed Today" /></p>
          </div>
        </div>
      </div>

      <div className={styles.recentRequests}>
        <h3><TranslatableText text="Recent Consultation Requests" /></h3>
        <div className={styles.requestsList}>
          {consultationRequests.slice(0, 3).map(request => (
            <div key={request.id} className={styles.requestCard}>
              <div className={styles.requestHeader}>
                <div className={styles.requestInfo}>
                  <h4>{request.subject}</h4>
                  <p><strong>Client:</strong> {request.userName}</p>
                </div>
                <div className={styles.requestBadges}>
                  <span 
                    className={styles.statusBadge}
                    style={{backgroundColor: getStatusColor(request.status)}}
                  >
                    {request.status.replace('_', ' ')}
                  </span>
                  <span 
                    className={styles.urgencyBadge}
                    style={{color: getUrgencyColor(request.urgency)}}
                  >
                    {request.urgency} priority
                  </span>
                </div>
              </div>
              <p className={styles.requestDescription}>{request.description}</p>
              <div className={styles.requestActions}>
                <span className={styles.requestDate}>{request.requestDate}</span>
                <button 
                  className={styles.viewButton}
                  onClick={() => {
                    setSelectedConsultation(request);
                    setActiveTab('consultations');
                  }}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderConsultations = () => (
    <div className={styles.consultationsContent}>
      {selectedConsultation ? (
        // Detailed consultation view
        <div className={styles.consultationDetail}>
          <div className={styles.consultationHeader}>
            <button 
              className={styles.backButton}
              onClick={() => setSelectedConsultation(null)}
            >
              <i className="fas fa-arrow-left"></i> Back to Consultations
            </button>
            <h3>Consultation Details - {selectedConsultation.id}</h3>
          </div>

          <div className={styles.consultationGrid}>
            <div className={styles.consultationInfo}>
              <div className={styles.clientCard}>
                <h4><TranslatableText text="Client Information" /></h4>
                <div className={styles.clientDetails}>
                  <p><strong>Name:</strong> {selectedConsultation.userName}</p>
                  <p><strong>Email:</strong> {selectedConsultation.userEmail}</p>
                  <p><strong>Subject:</strong> {selectedConsultation.subject}</p>
                  <p><strong>Request Date:</strong> {selectedConsultation.requestDate}</p>
                  <p><strong>Status:</strong> 
                    <span 
                      className={styles.statusBadge}
                      style={{backgroundColor: getStatusColor(selectedConsultation.status), marginLeft: '8px'}}
                    >
                      {selectedConsultation.status.replace('_', ' ')}
                    </span>
                  </p>
                  <p><strong>Consultation Type:</strong> Free 30-minute consultation</p>
                </div>
              </div>

              <div className={styles.descriptionCard}>
                <h4><TranslatableText text="Client's Request" /></h4>
                <p>{selectedConsultation.description}</p>
              </div>

              <div className={styles.actionsCard}>
                <h4><TranslatableText text="Consultation Actions" /></h4>
                <div className={styles.actionButtons}>
                  {selectedConsultation.status === 'pending' && (
                    <button 
                      className={styles.acceptButton}
                      onClick={() => handleAcceptConsultation(selectedConsultation.id)}
                    >
                      <i className="fas fa-check"></i> Accept Consultation
                    </button>
                  )}
                  {selectedConsultation.status === 'accepted' && (
                    <button 
                      className={styles.completeButton}
                      onClick={() => handleCompleteConsultation(selectedConsultation.id)}
                    >
                      <i className="fas fa-check-circle"></i> Mark as Completed
                    </button>
                  )}
                  {selectedConsultation.status === 'completed' && (
                    <span className={styles.completedText}>
                      <i className="fas fa-check-circle"></i> Consultation Completed
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.messagingSection}>
              <h4><TranslatableText text="Secure Messaging" /></h4>
              <div className={styles.messageHistory}>
                {messages
                  .filter(msg => msg.consultationId === selectedConsultation.id)
                  .map(message => (
                    <div 
                      key={message.id} 
                      className={`${styles.message} ${styles[message.type]}`}
                    >
                      <div className={styles.messageHeader}>
                        <strong>{message.senderName}</strong>
                        <span className={styles.messageTime}>{message.timestamp}</span>
                      </div>
                      <p className={styles.messageText}>{message.message}</p>
                    </div>
                  ))
                }
              </div>

              {selectedConsultation.status !== 'completed' && (
                <div className={styles.messageInput}>
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message to the client..."
                    className={styles.messageTextarea}
                  ></textarea>
                  <button 
                    className={styles.sendButton}
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <i className="fas fa-paper-plane"></i> Send Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        // Consultations list view
        <div className={styles.consultationsList}>
          <h3><TranslatableText text="Consultation Requests" /></h3>
          
          <div className={styles.consultationsFilter}>
            <button className={`${styles.filterButton} ${styles.active}`}>
              All ({consultationRequests.length})
            </button>
            <button className={styles.filterButton}>
              Pending ({consultationRequests.filter(req => req.status === 'pending').length})
            </button>
            <button className={styles.filterButton}>
              Active ({consultationRequests.filter(req => req.status === 'accepted').length})
            </button>
            <button className={styles.filterButton}>
              Completed ({consultationRequests.filter(req => req.status === 'completed').length})
            </button>
          </div>

          <div className={styles.consultationsGrid}>
            {consultationRequests.map(request => (
              <div key={request.id} className={styles.consultationCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardInfo}>
                    <h4>{request.subject}</h4>
                    <p><strong>Client:</strong> {request.userName}</p>
                    <p><strong>Date:</strong> {request.requestDate}</p>
                  </div>
                  <div className={styles.cardBadges}>
                    <span 
                      className={styles.statusBadge}
                      style={{backgroundColor: getStatusColor(request.status)}}
                    >
                      {request.status.replace('_', ' ')}
                    </span>
                    <span 
                      className={styles.urgencyBadge}
                      style={{color: getUrgencyColor(request.urgency)}}
                    >
                      {request.urgency}
                    </span>
                  </div>
                </div>
                
                <p className={styles.cardDescription}>
                  {request.description.length > 150 
                    ? `${request.description.substring(0, 150)}...`
                    : request.description
                  }
                </p>
                
                <div className={styles.cardActions}>
                  <button 
                    className={styles.viewDetailsButton}
                    onClick={() => setSelectedConsultation(request)}
                  >
                    View Details
                  </button>
                  {request.status === 'pending' && (
                    <button 
                      className={styles.quickAcceptButton}
                      onClick={() => handleAcceptConsultation(request.id)}
                    >
                      Quick Accept
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderProfile = () => (
    <div className={styles.profileContent}>
      <h3><TranslatableText text="My Profile" /></h3>
      
      <div className={styles.profileForm}>
        <div className={styles.photoSection}>
          <div className={styles.photoContainer}>
            {lawyerProfile.profilePhoto ? (
              <img 
                src={lawyerProfile.profilePhoto} 
                alt="Profile" 
                className={styles.profilePhoto}
              />
            ) : (
              <div className={styles.photoPlaceholder}>
                <i className="fas fa-user"></i>
                <span>No Photo</span>
              </div>
            )}
            <input
              type="file"
              id="photoUpload"
              accept="image/*"
              onChange={handlePhotoUpload}
              className={styles.photoInput}
            />
            <label htmlFor="photoUpload" className={styles.photoUploadButton}>
              <i className="fas fa-camera"></i> Upload Photo
            </label>
          </div>
        </div>

        <div className={styles.formSection}>
          <h4><TranslatableText text="Professional Information" /></h4>
          
          <div className={styles.fieldGroup}>
            <label>Full Name</label>
            <input type="text" defaultValue={user?.name} className={styles.inputField} />
          </div>
          
          <div className={styles.fieldGroup}>
            <label>Email Address</label>
            <input type="email" defaultValue={user?.email} className={styles.inputField} disabled />
          </div>
          
          <div className={styles.fieldGroup}>
            <label>Bar Council Registration Number</label>
            <input type="text" placeholder="Enter your Bar Council ID" className={styles.inputField} />
          </div>
        </div>

        <div className={styles.formSection}>
          <h4><TranslatableText text="Clinic Details" /></h4>
          
          <div className={styles.fieldGroup}>
            <label>Clinic Name</label>
            <input
              type="text"
              value={lawyerProfile.clinicName}
              onChange={(e) => setLawyerProfile(prev => ({...prev, clinicName: e.target.value}))}
              placeholder="Enter your clinic/office name"
              className={styles.inputField}
            />
          </div>
          
          <div className={styles.fieldGroup}>
            <label>Full Address</label>
            <textarea
              value={lawyerProfile.address}
              onChange={(e) => setLawyerProfile(prev => ({...prev, address: e.target.value}))}
              placeholder="Enter complete address with city, state, and pincode"
              className={styles.textareaField}
            ></textarea>
          </div>
          
          <div className={styles.fieldGroup}>
            <label>Clinic Contact Email</label>
            <input
              type="email"
              value={lawyerProfile.contactEmail}
              onChange={(e) => setLawyerProfile(prev => ({...prev, contactEmail: e.target.value}))}
              placeholder="clinic@example.com"
              className={styles.inputField}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label>Working Days</label>
            <div className={styles.workingDays}>
              {Object.entries(lawyerProfile.workingDays).map(([day, isWorking]) => (
                <label key={day} className={styles.dayCheckbox}>
                  <input
                    type="checkbox"
                    checked={isWorking}
                    onChange={(e) => setLawyerProfile(prev => ({
                      ...prev,
                      workingDays: {
                        ...prev.workingDays,
                        [day]: e.target.checked
                      }
                    }))}
                  />
                  <span>{day.charAt(0).toUpperCase() + day.slice(1)}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.timeSection}>
            <div className={styles.fieldGroup}>
              <label>Opening Time</label>
              <input
                type="time"
                value={lawyerProfile.openingTime}
                onChange={(e) => setLawyerProfile(prev => ({...prev, openingTime: e.target.value}))}
                className={styles.inputField}
              />
            </div>
            
            <div className={styles.fieldGroup}>
              <label>Closing Time</label>
              <input
                type="time"
                value={lawyerProfile.closingTime}
                onChange={(e) => setLawyerProfile(prev => ({...prev, closingTime: e.target.value}))}
                className={styles.inputField}
              />
            </div>
          </div>
        </div>

        <button className={styles.saveButton} onClick={handleProfileSave}>
          <i className="fas fa-save"></i> Save Profile
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.lawyerDashboard}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2><TranslatableText text="Lawyer Dashboard" /></h2>
          <p>Welcome, {user?.name}</p>
        </div>
        
        <nav className={styles.sidebarNav}>
          <button 
            className={`${styles.navItem} ${activeTab === 'overview' ? styles.active : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <i className="fas fa-tachometer-alt"></i>
            <TranslatableText text="Overview" />
          </button>
          
          <button 
            className={`${styles.navItem} ${activeTab === 'consultations' ? styles.active : ''}`}
            onClick={() => {
              setActiveTab('consultations');
              setSelectedConsultation(null);
            }}
          >
            <i className="fas fa-users"></i>
            <TranslatableText text="Consultations" />
            {consultationRequests.filter(req => req.status === 'pending').length > 0 && (
              <span className={styles.notificationBadge}>
                {consultationRequests.filter(req => req.status === 'pending').length}
              </span>
            )}
          </button>
          
          <button 
            className={`${styles.navItem} ${activeTab === 'profile' ? styles.active : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <i className="fas fa-user"></i>
            <TranslatableText text="My Profile" />
          </button>
          
          <button 
            className={styles.navItem}
            onClick={handleLogout}
            style={{ marginTop: 'auto', borderTop: '1px solid #e9ecef', color: '#dc3545' }}
          >
            <i className="fas fa-sign-out-alt"></i>
            <TranslatableText text="Logout" />
          </button>
        </nav>
      </div>
      
      <div className={styles.mainContent}>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'consultations' && renderConsultations()}
        {activeTab === 'profile' && renderProfile()}
      </div>
    </div>
  );
};

export default LawyerDashboard;

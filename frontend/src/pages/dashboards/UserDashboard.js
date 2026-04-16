import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import TranslatableText from '../../components/TranslatableText';
import styles from './UserDashboard.module.css';

const UserDashboard = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('consultations');
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [consultations, setConsultations] = useState([]);
  const [documents, setDocuments] = useState([]);

  // Redirect to home if not authenticated or not a user
  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'user') {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Mock data for consultations
  useEffect(() => {
    const mockConsultations = [
      {
        id: 1,
        lawyerId: 1,
        lawyerName: 'Adv. Priya Sharma',
        lawyerPhoto: '/api/placeholder/50/50',
        specialization: 'Family Law',
        initiatedDate: '2025-08-10',
        lastMessageDate: '2025-08-14',
        lastMessage: 'Thank you for providing the details. Based on what you\'ve shared, I believe we have a strong case...',
        status: 'Active',
        messages: [
          {
            id: 1,
            sender: 'user',
            senderName: user?.name || 'You',
            text: 'Hello, I need help with a divorce case. My husband and I have been separated for 2 years and we want to file for mutual consent divorce.',
            timestamp: '2025-08-10T10:30:00Z'
          },
          {
            id: 2,
            sender: 'lawyer',
            senderName: 'Adv. Priya Sharma',
            text: 'Hello! I understand you need assistance with a mutual consent divorce. This is definitely something I can help you with. Could you please provide me with some more details about your situation?',
            timestamp: '2025-08-10T14:45:00Z'
          },
          {
            id: 3,
            sender: 'user',
            senderName: user?.name || 'You',
            text: 'We have no children and we\'ve already divided our assets amicably. We just need help with the legal paperwork and court procedures.',
            timestamp: '2025-08-11T09:15:00Z'
          },
          {
            id: 4,
            sender: 'lawyer',
            senderName: 'Adv. Priya Sharma',
            text: 'Thank you for providing the details. Based on what you\'ve shared, I believe we have a strong case for mutual consent divorce. The process typically takes 6-18 months. Would you like to schedule a detailed consultation?',
            timestamp: '2025-08-14T16:20:00Z'
          }
        ]
      },
      {
        id: 2,
        lawyerId: 2,
        lawyerName: 'Adv. Rajesh Kumar',
        lawyerPhoto: '/api/placeholder/50/50',
        specialization: 'Property Law',
        initiatedDate: '2025-08-05',
        lastMessageDate: '2025-08-12',
        lastMessage: 'I\'ve reviewed your property documents. There are a few discrepancies we need to address...',
        status: 'Awaiting Reply',
        messages: [
          {
            id: 1,
            sender: 'user',
            senderName: user?.name || 'You',
            text: 'I\'m having issues with my property registration. The seller is claiming there are no pending dues, but I found some tax arrears.',
            timestamp: '2025-08-05T11:00:00Z'
          },
          {
            id: 2,
            sender: 'lawyer',
            senderName: 'Adv. Rajesh Kumar',
            text: 'This is a common issue in property transactions. Can you send me copies of the property documents and the tax records you\'ve found?',
            timestamp: '2025-08-05T15:30:00Z'
          },
          {
            id: 3,
            sender: 'user',
            senderName: user?.name || 'You',
            text: 'I\'ve uploaded the documents to our shared folder. Please review them when you get a chance.',
            timestamp: '2025-08-08T10:20:00Z'
          },
          {
            id: 4,
            sender: 'lawyer',
            senderName: 'Adv. Rajesh Kumar',
            text: 'I\'ve reviewed your property documents. There are a few discrepancies we need to address before proceeding with the registration. Let me prepare a detailed analysis for you.',
            timestamp: '2025-08-12T13:45:00Z'
          }
        ]
      },
      {
        id: 3,
        lawyerId: 3,
        lawyerName: 'Adv. Meera Patel',
        lawyerPhoto: '/api/placeholder/50/50',
        specialization: 'Consumer Rights',
        initiatedDate: '2025-07-28',
        lastMessageDate: '2025-08-01',
        lastMessage: 'Based on the evidence you\'ve provided, we can definitely file a complaint with the consumer forum...',
        status: 'Closed',
        messages: [
          {
            id: 1,
            sender: 'user',
            senderName: user?.name || 'You',
            text: 'I bought a defective mobile phone and the company is refusing to replace it despite being under warranty.',
            timestamp: '2025-07-28T14:00:00Z'
          },
          {
            id: 2,
            sender: 'lawyer',
            senderName: 'Adv. Meera Patel',
            text: 'This sounds like a clear case of deficiency in service. Do you have the purchase receipt and warranty card?',
            timestamp: '2025-07-28T16:30:00Z'
          },
          {
            id: 3,
            sender: 'user',
            senderName: user?.name || 'You',
            text: 'Yes, I have all the documents. I also have email correspondence with their customer service team.',
            timestamp: '2025-07-29T09:00:00Z'
          },
          {
            id: 4,
            sender: 'lawyer',
            senderName: 'Adv. Meera Patel',
            text: 'Based on the evidence you\'ve provided, we can definitely file a complaint with the consumer forum. I\'ll help you prepare the necessary documents.',
            timestamp: '2025-08-01T11:15:00Z'
          }
        ]
      }
    ];
    setConsultations(mockConsultations);
  }, [user]);

  // Mock data for downloaded documents
  useEffect(() => {
    const mockDocuments = [
      {
        id: 1,
        name: 'Consumer Complaint Form',
        category: 'Consumer Rights',
        downloadDate: '2025-08-12',
        fileUrl: '/documents/consumer-complaint-form.pdf',
        description: 'Standard format for filing consumer complaints'
      },
      {
        id: 2,
        name: 'Rent Agreement Template',
        category: 'Property Law',
        downloadDate: '2025-08-08',
        fileUrl: '/documents/rent-agreement-template.pdf',
        description: 'Comprehensive rental agreement template'
      },
      {
        id: 3,
        name: 'Power of Attorney Format',
        category: 'Legal Documentation',
        downloadDate: '2025-08-05',
        fileUrl: '/documents/power-of-attorney.pdf',
        description: 'General power of attorney document'
      },
      {
        id: 4,
        name: 'Divorce Petition (Mutual Consent)',
        category: 'Family Law',
        downloadDate: '2025-08-03',
        fileUrl: '/documents/divorce-petition-mutual.pdf',
        description: 'Mutual consent divorce petition template'
      },
      {
        id: 5,
        name: 'Property Sale Agreement',
        category: 'Property Law',
        downloadDate: '2025-07-30',
        fileUrl: '/documents/property-sale-agreement.pdf',
        description: 'Standard property sale agreement format'
      }
    ];
    setDocuments(mockDocuments);
  }, []);

  // Send message function
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConsultation) return;

    const message = {
      id: Date.now(),
      sender: 'user',
      senderName: user?.name || 'You',
      text: newMessage.trim(),
      timestamp: new Date().toISOString()
    };

    setConsultations(prev => 
      prev.map(consultation => 
        consultation.id === selectedConsultation.id
          ? {
              ...consultation,
              messages: [...consultation.messages, message],
              lastMessage: newMessage.trim(),
              lastMessageDate: new Date().toISOString().split('T')[0],
              status: 'Awaiting Reply'
            }
          : consultation
      )
    );

    // Update selected consultation
    setSelectedConsultation(prev => ({
      ...prev,
      messages: [...prev.messages, message],
      lastMessage: newMessage.trim(),
      lastMessageDate: new Date().toISOString().split('T')[0],
      status: 'Awaiting Reply'
    }));

    setNewMessage('');
  };

  // Download document function
  const handleDownloadDocument = (doc) => {
    // In a real application, this would trigger an actual download
    // For now, we'll simulate the download
    const link = document.createElement('a');
    link.href = doc.fileUrl;
    link.download = doc.name + '.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success message (you could use a toast notification library)
    alert(`${doc.name} downloaded successfully!`);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format time for messages
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return '#28a745';
      case 'Awaiting Reply': return '#ffc107';
      case 'Closed': return '#6c757d';
      default: return '#007bff';
    }
  };

  // Render Consultations Tab
  const renderConsultations = () => {
    if (selectedConsultation) {
      return (
        <div className={styles.chatInterface}>
          <div className={styles.chatHeader}>
            <button 
              className={styles.backButton}
              onClick={() => setSelectedConsultation(null)}
            >
              <i className="fas fa-arrow-left"></i>
              <TranslatableText text="Back to Consultations" />
            </button>
            <div className={styles.lawyerInfo}>
              <img 
                src={selectedConsultation.lawyerPhoto} 
                alt={selectedConsultation.lawyerName}
                className={styles.lawyerAvatar}
              />
              <div>
                <h3>{selectedConsultation.lawyerName}</h3>
                <p>{selectedConsultation.specialization}</p>
              </div>
            </div>
          </div>

          <div className={styles.messagesContainer}>
            {selectedConsultation.messages.map(message => (
              <div 
                key={message.id} 
                className={`${styles.message} ${styles[message.sender]}`}
              >
                <div className={styles.messageHeader}>
                  <strong>{message.senderName}</strong>
                  <span className={styles.messageTime}>
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                <p className={styles.messageText}>{message.text}</p>
              </div>
            ))}
          </div>

          <div className={styles.messageInput}>
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className={styles.messageTextarea}
              rows="3"
            />
            <button 
              onClick={handleSendMessage}
              className={styles.sendButton}
              disabled={!newMessage.trim()}
            >
              <i className="fas fa-paper-plane"></i>
              <TranslatableText text="Send" />
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.consultationsList}>
        <h3><TranslatableText text="My Consultations" /></h3>
        <p className={styles.sectionDescription}>
          <TranslatableText text="View and continue your conversations with legal experts" />
        </p>
        
        {consultations.length === 0 ? (
          <div className={styles.emptyState}>
            <i className="fas fa-comments"></i>
            <h4><TranslatableText text="No Consultations Yet" /></h4>
            <p><TranslatableText text="Start a conversation with a lawyer to see your consultations here" /></p>
          </div>
        ) : (
          <div className={styles.consultationsGrid}>
            {consultations.map(consultation => (
              <div 
                key={consultation.id} 
                className={styles.consultationCard}
                onClick={() => setSelectedConsultation(consultation)}
              >
                <div className={styles.cardHeader}>
                  <img 
                    src={consultation.lawyerPhoto} 
                    alt={consultation.lawyerName}
                    className={styles.lawyerPhoto}
                  />
                  <div className={styles.lawyerDetails}>
                    <h4>{consultation.lawyerName}</h4>
                    <p className={styles.specialization}>{consultation.specialization}</p>
                    <p className={styles.initiatedDate}>
                      Started: {formatDate(consultation.initiatedDate)}
                    </p>
                  </div>
                  <div 
                    className={styles.statusBadge}
                    style={{ backgroundColor: getStatusColor(consultation.status) }}
                  >
                    {consultation.status}
                  </div>
                </div>
                
                <div className={styles.lastMessage}>
                  <p>{consultation.lastMessage}</p>
                  <span className={styles.lastMessageDate}>
                    {formatDate(consultation.lastMessageDate)}
                  </span>
                </div>
                
                <div className={styles.cardFooter}>
                  <button className={styles.viewChatButton}>
                    <i className="fas fa-comment"></i>
                    <TranslatableText text="View Conversation" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Render Documents Tab
  const renderDocuments = () => {
    return (
      <div className={styles.documentsList}>
        <h3><TranslatableText text="My Documents" /></h3>
        <p className={styles.sectionDescription}>
          <TranslatableText text="Access all your downloaded legal document templates" />
        </p>
        
        {documents.length === 0 ? (
          <div className={styles.emptyState}>
            <i className="fas fa-file-alt"></i>
            <h4><TranslatableText text="No Documents Downloaded" /></h4>
            <p><TranslatableText text="Download legal templates to see them here" /></p>
          </div>
        ) : (
          <div className={styles.documentsGrid}>
            {documents.map(document => (
              <div key={document.id} className={styles.documentCard}>
                <div className={styles.documentIcon}>
                  <i className="fas fa-file-pdf"></i>
                </div>
                
                <div className={styles.documentInfo}>
                  <h4>{document.name}</h4>
                  <p className={styles.documentCategory}>{document.category}</p>
                  <p className={styles.documentDescription}>{document.description}</p>
                  <p className={styles.downloadDate}>
                    Downloaded: {formatDate(document.downloadDate)}
                  </p>
                </div>
                
                <div className={styles.documentActions}>
                  <button 
                    className={styles.downloadAgainButton}
                    onClick={() => handleDownloadDocument(document)}
                  >
                    <i className="fas fa-download"></i>
                    <TranslatableText text="Download Again" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={styles.userDashboard}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2><TranslatableText text="My Dashboard" /></h2>
          <p>Welcome, {user?.name}</p>
        </div>
        
        <nav className={styles.sidebarNav}>
          <button 
            className={`${styles.navItem} ${activeTab === 'consultations' ? styles.active : ''}`}
            onClick={() => {
              setActiveTab('consultations');
              setSelectedConsultation(null);
            }}
          >
            <i className="fas fa-comments"></i>
            <TranslatableText text="My Consultations" />
            {consultations.filter(c => c.status === 'Active' || c.status === 'Awaiting Reply').length > 0 && (
              <span className={styles.notificationBadge}>
                {consultations.filter(c => c.status === 'Active' || c.status === 'Awaiting Reply').length}
              </span>
            )}
          </button>
          
          <button 
            className={`${styles.navItem} ${activeTab === 'documents' ? styles.active : ''}`}
            onClick={() => setActiveTab('documents')}
          >
            <i className="fas fa-file-alt"></i>
            <TranslatableText text="My Documents" />
            <span className={styles.countBadge}>
              {documents.length}
            </span>
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
        {activeTab === 'consultations' && renderConsultations()}
        {activeTab === 'documents' && renderDocuments()}
      </div>
    </div>
  );
};

export default UserDashboard;

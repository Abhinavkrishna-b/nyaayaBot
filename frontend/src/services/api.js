import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchContent = async (language = 'en') => {
  try {
    const response = await api.get(`/content?language=${language}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching content:', error);
    return null;
  }
};

// === FIX: The postQuery function now accepts a second argument, 'chatHistory' ===
export const postQuery = async (query, chatHistory) => {
  try {
    // === FIX: We now send both the new query and the chat history to the backend ===
    const response = await api.post('/query', { 
        query_text: query,
        chat_history: chatHistory 
    });
    return response.data;
  } catch (error) {
    console.error('Error posting query:', error);
    if (error.response) {
      return { 
        error: `An error occurred: ${error.response.data.detail || error.response.statusText}` 
      };
    }
    return { error: 'Could not connect to the server. Please ensure it is running.' };
  }
};

// NEW FUNCTION: AI-Powered Document Generation
export const generateAIDocument = async (complaintData) => {
  try {
    const response = await api.post('/generate-document', {
      caseType: complaintData.caseType,
      courtDetails: {
        court: getCourtName(complaintData.caseType),
        city: complaintData.incidentLocation || 'Delhi'
      },
      complainantDetails: {
        name: complaintData.complainantName,
        address: complaintData.complainantAddress,
        phone: complaintData.complainantPhone,
        email: complaintData.complainantEmail || ''
      },
      respondentDetails: [{
        name: complaintData.respondentName,
        address: complaintData.respondentAddress || ''
      }],
      incidentDetails: {
        date: complaintData.incidentDate,
        location: complaintData.incidentLocation,
        description: complaintData.situation
      },
      legalGrounds: getLegalGrounds(complaintData.caseType),
      reliefSought: complaintData.reliefSought.split('\n').filter(item => item.trim())
    });
    
    return { success: true, document: response.data.document };
  } catch (error) {
    console.error('Error generating AI document:', error);
    return { 
      success: false, 
      error: error.response?.data?.detail || 'Failed to generate document' 
    };
  }
};

// Helper function to get court name
const getCourtName = (caseType) => {
  const courtMapping = {
    'Consumer Rights': 'District Consumer Disputes Redressal Forum',
    'Employment': 'Labour Court',
    'Property': 'Civil Court',
    'Family Law': 'Family Court',
    'Civil Rights': 'Civil Court',
    'Financial': 'Civil Court'
  };
  return courtMapping[caseType] || 'Civil Court';
};

// Helper function to get legal grounds
const getLegalGrounds = (caseType) => {
  const groundsMapping = {
    'Consumer Rights': 'Consumer Protection Act, 2019; Sale of Goods Act, 1930',
    'Employment': 'Industrial Disputes Act, 1947; Payment of Wages Act, 1936',
    'Property': 'Transfer of Property Act, 1882; Indian Easements Act, 1882',
    'Family Law': 'Hindu Marriage Act, 1955; Protection of Women from Domestic Violence Act, 2005',
    'Civil Rights': 'Indian Constitution Articles 14, 19, 21; Civil Rights Protection Act, 1955',
    'Financial': 'Banking Regulation Act, 1949; Negotiable Instruments Act, 1881'
  };
  return groundsMapping[caseType] || 'Relevant applicable laws';
};

export default api;
// types are not used in JS, so we remove the import
// import type { Language, Translation } from './types'; ❌ removed

export const translations = {
  English: { 
    title: 'Know Your Rights', 
    subtitle: 'Your AI-powered legal assistant for Indian law', 
    placeholder: 'Ask any question about Indian law...', 
    button: 'Ask', 
    chips: ['Fundamental Rights', 'Filing FIR', 'Consumer Rights', 'Labour Laws'] 
  },
  Tamil: { 
    title: 'உங்கள் உரிமைகளை அறிந்து கொள்ளுங்கள்', 
    subtitle: 'இந்திய சட்டத்திற்கான உங்கள் AI-இயங்கும் சட்ட உதவியாளர்', 
    placeholder: 'இந்திய சட்டம் பற்றி எந்த கேள்வியும் கேட்கவும்...', 
    button: 'கேள்', 
    chips: ['அடிப்படை உரிமைகள்', 'FIR பதிவு செய்தல்', 'நுகர்வோர் உரிமைகள்', 'தொழிலாளர் சட்டங்கள்'] 
  },
    Hindi: { 
    title: 'अपने अधिकार जानें', 
    subtitle: 'भारतीय कानून के लिए आपका AI-संचालित कानूनी सहायक', 
    placeholder: 'भारतीय कानून के बारे में कोई भी प्रश्न पूछें...', 
    button: 'पूछें', 
    chips: ['मौलिक अधिकार', 'FIR दर्ज करना', 'उपभोक्ता अधिकार', 'श्रम कानून'] 
  },
  Bengali: { 
    title: 'আপনার অধিকার জানুন', 
    subtitle: 'ভারতীয় আইনের জন্য আপনার AI-চালিত আইনি সহায়ক', 
    placeholder: 'ভারতীয় আইন সম্পর্কে যেকোনো প্রশ্ন জিজ্ঞাসা করুন...', 
    button: 'জিজ্ঞাসা করুন', 
    chips: ['মৌলিক অধিকার', 'এফআইআর দায়ের করা', 'ভোক্তা অধিকার', 'শ্রম আইন'] 
  },
  Telugu: { 
    title: 'మీ హక్కులను తెలుసుకోండి', 
    subtitle: 'భారతీయ చట్టం కోసం మీ AI-శక్తితో కూడిన చట్టపరమైన సహాయకుడు', 
    placeholder: 'భారతీయ చట్టం గురించి ఏదైనా ప్రశ్న అడగండి...', 
    button: 'అడగండి', 
    chips: ['ప్రాథమిక హక్కులు', 'FIR ఎలా దాఖలు చేయాలి', 'వినియోగదారుల హక్కులు', 'కార్మిక చట్టాలు'] 
  },
  Marathi: { 
    title: 'आपले हक्क जाणून घ्या', 
    subtitle: 'भारतीय कायद्यासाठी तुमचा AI-चालित कायदेशीर सहाय्यक', 
    placeholder: 'भारतीय कायद्याबद्दल कोणताही प्रश्न विचारा...', 
    button: 'विचारा', 
    chips: ['मूलभूत हक्क', 'एफआयआर दाखल करणे', 'ग्राहक हक्क', 'कामगार कायदे'] 
  }
};

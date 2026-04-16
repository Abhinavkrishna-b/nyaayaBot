# LegalAid India - Client-Side Application

A fully responsive, single-page application (SPA) that makes legal information accessible to every Indian citizen. Built with React and modern web technologies.

## 🎯 Core Objective

To develop a pixel-perfect, single-page application that empowers Indian citizens with accessible legal information through an intuitive user interface, AI-powered chatbot assistance, and multilingual support.

## ✨ Key Features

### 🤖 AI Chat Assistant
- 24/7 available chatbot for legal questions
- Pre-set common topics (Property Rights, Consumer complaints, Labor laws)
- Real-time typing indicators and feedback
- API integration for chat logging

### 🌐 Multilingual Support
- Support for 8 major Indian languages
- Dynamic content switching
- Native script display (हिन्दी, বাংলা, தமிழ், etc.)
- Animated language selection modal

### 📋 Know Your Rights Section
- 2x3 grid layout of legal topics
- Icon-based visual representation
- Interactive cards with hover effects
- "Learn More" links for detailed information

### 🏛️ Legal Aid Services
- Free legal consultation information
- Document templates access
- Local legal clinics directory
- Service cards with images and descriptions

### 📖 Success Stories
- Real testimonials from users
- Circular avatar images
- Location-based user information
- Inspirational quotes and outcomes

### 🎨 Modern UI/UX
- Blue and white color scheme
- Smooth scrolling navigation
- Responsive design for all devices
- Hover animations and transitions

## 🛠️ Tech Stack

- **React 18+** with Hooks
- **CSS Modules** for styling (No Tailwind CSS)
- **Axios** for HTTP communications
- **React Scroll** for smooth navigation
- **Font Awesome** for icons
- **Google Fonts** (Poppins)

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Chatbot.js
│   ├── Chatbot.module.css
│   ├── LanguageModal.js
│   ├── LanguageModal.module.css
│   ├── TopicCard.js
│   ├── TopicCard.module.css
│   ├── ServiceCard.js
│   ├── ServiceCard.module.css
│   ├── TestimonialCard.js
│   └── TestimonialCard.module.css
├── sections/           # Major page sections
│   ├── Navbar.js
│   ├── Navbar.module.css
│   ├── Hero.js
│   ├── Hero.module.css
│   ├── LegalCompanion.js
│   ├── LegalCompanion.module.css
│   ├── KnowYourRights.js
│   ├── KnowYourRights.module.css
│   ├── LegalAidServices.js
│   ├── LegalAidServices.module.css
│   ├── SuccessStories.js
│   ├── SuccessStories.module.css
│   ├── Footer.js
│   └── Footer.module.css
├── services/           # API services
│   └── api.js
├── App.js             # Main application component
├── index.js           # React entry point
└── global.css         # Global styles and CSS variables
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd legalaid-india
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## 🔧 Configuration

### API Configuration
The application expects a backend API running on `http://localhost:3001`. Update the base URL in `src/services/api.js` if needed:

```javascript
const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  // ...
});
```

### Environment Variables
Create a `.env` file in the root directory for environment-specific configurations:

```env
REACT_APP_API_BASE_URL=http://localhost:3001/api
REACT_APP_ENVIRONMENT=development
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#2563EB`
- **Primary White**: `#FFFFFF`
- **Text Dark**: `#1F2937`
- **Text Light**: `#6B7281`
- **Background Light**: `#F9FAFB`
- **Border Color**: `#E5E7EB`

### Typography
- **Font Family**: Poppins (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Spacing & Layout
- **Container Max Width**: 1200px
- **Section Padding**: 80px (desktop), 60px (mobile)
- **Grid Gaps**: 2rem (desktop), 1.5rem (mobile)

## 📱 Responsive Design

The application is fully responsive with breakpoints at:
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🔌 API Integration

### Endpoints Used
- `GET /api/content?language={lang}` - Fetch localized content
- `POST /api/chat/log` - Log chat messages

### Content Structure
The API should return content in the following structure:

```javascript
{
  topics: [
    {
      icon: "fas fa-home",
      title: "Property Rights",
      description: "..."
    }
  ],
  services: [
    {
      image: "url",
      title: "Free Legal Consultation",
      description: "...",
      actionText: "Find a Lawyer"
    }
  ],
  testimonials: [
    {
      photo: "url",
      name: "User Name",
      location: "Location, State",
      quote: "..."
    }
  ]
}
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 📦 Build & Deploy

### Production Build
```bash
npm run build
```

### Deploy to Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Email: info@legalaidindia.org
- Toll-free: 1800-LEGAL-AID

## 🙏 Acknowledgments

- React team for the amazing framework
- Font Awesome for icons
- Unsplash for stock images
- All contributors and supporters

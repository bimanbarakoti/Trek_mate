# TrekMate Setup Guide

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd trek_mate
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your API keys:
# - Get OpenAI API key from: https://platform.openai.com/api-keys
# - Get Gemini API key from: https://makersuite.google.com/app/apikey
```

### 4. Run Development Server
```bash
npm run dev
```

### 5. Open in Browser
Navigate to `http://localhost:5173`

## 🔑 Required API Keys

### OpenAI ChatGPT API
1. Visit https://platform.openai.com/api-keys
2. Create new API key
3. Add to `.env` as `VITE_CHATGPT_API_KEY`

### Google Gemini API
1. Visit https://makersuite.google.com/app/apikey
2. Create new API key  
3. Add to `.env` as `VITE_GEMINI_API_KEY`

## 📁 Project Structure
```
trek_mate/
├── src/
│   ├── App.jsx           # Main application (all components)
│   ├── main.jsx          # React entry point
│   ├── index.css         # Global styles
│   └── context/
│       └── AppContext.jsx # App context provider
├── .env.example          # Environment template
├── package.json          # Dependencies
└── README.md            # Project overview
```

## 🛠️ Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🎯 Features
- 🏔️ Trek exploration and filtering
- 🤖 AI-powered trek assistant
- 🌦️ Weather-aware recommendations
- 📱 Fully responsive design
- 💾 Offline-friendly storage

---
**Created by**: Biman Barakoti | **Email**: bimanbarakoti@gmail.com
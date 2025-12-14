import React from 'react';

const ApiStatus = () => {
  const chatgptConfigured = !!import.meta.env.VITE_CHATGPT_API_KEY || !!import.meta.env.VITE_CHATGPT_API_URL;
  const geminiConfigured = !!import.meta.env.VITE_GEMINI_API_KEY || !!import.meta.env.VITE_GEMINI_API_URL;

  if (chatgptConfigured && geminiConfigured) return null;

  return (
    <div style={{
      background: '#fef3c7',
      border: '1px solid #f59e0b',
      borderRadius: '8px',
      padding: '0.75rem 1rem',
      margin: '1rem 0',
      fontSize: '0.875rem',
      color: '#92400e'
    }}>
      <strong>⚠️ Demo Mode:</strong> Add API keys to .env file for real AI responses.
      {!chatgptConfigured && <div>• Missing VITE_CHATGPT_API_KEY</div>}
      {!geminiConfigured && <div>• Missing VITE_GEMINI_API_KEY</div>}
    </div>
  );
};

export default ApiStatus;
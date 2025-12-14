import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './AIChatAssistant.css';
import Loader from '../UI/Loader';
import useScrollReveal from '../../hooks/useScrollReveal';
import ChatGPTService from '../../api/chatgptService';
import GeminiService from '../../api/geminiService';
import { useAppContext } from '../../context/useAppContext';

/**
 * AIChatAssistant Component
 * Interactive chat interface with message history, loading states, and quick action buttons
 * Supports message scrolling, error handling, and user interactions
 */
const AIChatAssistant = ({
  onSendMessage,
  apiProvider,
  initialMessage,
  quickActions,
  trek,
  location
}) => {
  const revealRef = useScrollReveal({ threshold: 0.06 });
  // If apiProvider not provided as a prop, fall back to preferences from AppContext
  const { preferences, location: ctxLocation } = useAppContext();
  const effectiveLocation = location || ctxLocation;
  const provider = apiProvider || preferences?.aiProvider || 'chatgpt';

  const [messages, setMessages] = useState(() => {
    // Initialize with welcome message
    if (initialMessage) {
      return [
        { id: 1, role: 'assistant', content: initialMessage, timestamp: new Date() }
      ];
    }
    return [];
  });

  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);
  const messageIdRef = useRef(1);

  /**
   * Scroll to bottom of messages
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  /**
   * Auto-scroll when messages change
   */
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /**
   * Focus input on mount
   */
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Initialize AI session on mount (if using providers)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        if (provider === 'chatgpt') {
          const init = await ChatGPTService.initializeChat();
          if (mounted && init?.sessionId) setSessionId(init.sessionId);
        }
      } catch (err) {
        console.warn('[AIChatAssistant] Failed to initialize session', err);
      }
    })();
    return () => { mounted = false; };
  }, [provider]);

  /**
   * Handle message submission
   */
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputValue.trim()) {
      return;
    }

    setError(null);

    // Add user message to chat
    const userMessage = {
      id: messageIdRef.current++,
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');

    // Set loading state
    setLoading(true);

    try {
      // Call parent's onSendMessage function if provided
      if (onSendMessage) {
        const response = await onSendMessage(inputValue);
        const assistantMessage = {
          id: messageIdRef.current++,
          role: 'assistant',
          content: response,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);

      } else if (provider === 'chatgpt' && sessionId) {
        // Use ChatGPT service
        // If trek or location provided, include them in the prompt to make guidance contextual
        let messageToSend = inputValue;
        if (trek) {
          messageToSend += `\n\nTrek Context: ${trek.name} (${trek.region}). Trek summary: ${trek.description || ''}`;
        }
        if (effectiveLocation) {
          messageToSend += `\n\nUser Location: ${effectiveLocation.name || `${effectiveLocation.lat},${effectiveLocation.lng}`}`;
        }
        const res = await ChatGPTService.sendMessage(messageToSend, sessionId);
        const content = res?.text || res?.message || (typeof res === 'string' ? res : JSON.stringify(res));
        const assistantMessage = {
          id: messageIdRef.current++,
          role: 'assistant',
          content,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);

      } else if (provider === 'gemini') {
        // Use Gemini for location-based recommendations and real-time data
        let messageToSend = inputValue;
        if (effectiveLocation) {
          messageToSend += `\n\nUser Location: ${effectiveLocation.name || `${effectiveLocation.lat},${effectiveLocation.lng}`}`;
        }
        
        // Determine the type of query and use appropriate Gemini service
        const lowerMessage = inputValue.toLowerCase();
        let res;
        
        if (lowerMessage.includes('weather') || lowerMessage.includes('forecast')) {
          res = await GeminiService.getWeatherForecast(effectiveLocation || { name: 'Current Area' });
        } else if (lowerMessage.includes('safety') || lowerMessage.includes('alert')) {
          res = await GeminiService.getSafetyAlerts(effectiveLocation || { name: 'Current Area' });
        } else if (lowerMessage.includes('near me') || lowerMessage.includes('nearby') || lowerMessage.includes('recommend')) {
          res = await GeminiService.getLocationBasedRecommendations(effectiveLocation || { name: 'User Area' }, 'treks');
        } else {
          res = await GeminiService.getLocationBasedRecommendations(effectiveLocation || { name: 'User Area' }, 'all');
        }
        
        const content = typeof res === 'string' ? res : JSON.stringify(res, null, 2);
        const assistantMessage = {
          id: messageIdRef.current++,
          role: 'assistant',
          content,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);

      } else {
        // Fallback: show mock response
        setTimeout(() => {
          const mockResponse = {
            id: messageIdRef.current++,
            role: 'assistant',
            content: `I'm a demo assistant. To enable real responses, please configure the ${provider ?? 'apiProvider'} API. Your message: "${inputValue}"`,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, mockResponse]);
        }, 700);
      }
    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again.');
      console.error('Chat error:', err);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  /**
   * Handle quick action click
   */
  const handleQuickAction = async (action) => {
    setInputValue(action.label);
    setError(null);
    setLoading(true);

    try {
      // Add user message
      const userMessage = {
        id: messageIdRef.current++,
        role: 'user',
        content: action.label,
        timestamp: new Date()
      };

      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);

      // Call parent's onSendMessage function with action value
      if (onSendMessage) {
        const response = await onSendMessage(action.value || action.label);

        const assistantMessage = {
          id: messageIdRef.current++,
          role: 'assistant',
          content: response,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (err) {
      setError(err.message || 'Failed to process action. Please try again.');
      console.error('Quick action error:', err);
    } finally {
      setLoading(false);
      setInputValue('');
    }
  };

  /**
   * Clear chat history
   */
  const handleClearChat = () => {
    if (window.confirm('Clear all messages?')) {
      setMessages(
        initialMessage
          ? [{ id: 1, role: 'assistant', content: initialMessage, timestamp: new Date() }]
          : []
      );
      setError(null);
      messageIdRef.current = 2;
    }
  };

  /**
   * Format timestamp
   */
  const formatTime = (timestamp) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(timestamp);
  };

  return (
    <div ref={revealRef} data-reveal data-reveal-animation="fade-in-up" role="region" aria-label="Trek Assistant" className={`ai-chat-assistant ${!isExpanded ? 'ai-chat-assistant--collapsed' : ''}`}>
      
      {/* Header */}
      <div className="ai-chat-assistant__header">
        <div className="ai-chat-assistant__header-content">
          <div className="ai-chat-assistant__header-title-wrapper">
            <h3 className="ai-chat-assistant__title">
              <span className="ai-chat-assistant__ai-icon">🤖</span>
              Trek Assistant
            </h3>
            <span className="ai-chat-assistant__status">
              {provider === 'chatgpt' && 'GPT-4'}
              {provider === 'gemini' && 'Gemini'}
              {!provider && 'Demo'}
            </span>
          </div>
        </div>
        
        {/* Header Actions */}
        <div className="ai-chat-assistant__header-actions">
          <button
            className="ai-chat-assistant__action-btn ai-chat-assistant__clear-btn"
            onClick={handleClearChat}
            title="Clear chat"
            aria-label="Clear chat history"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-9l-1 1H5v2h14V4z"/>
            </svg>
          </button>
          
          <button
            className="ai-chat-assistant__action-btn ai-chat-assistant__toggle-btn"
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? 'Minimize' : 'Expand'}
            aria-label={isExpanded ? 'Minimize chat' : 'Expand chat'}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              {isExpanded ? (
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
              ) : (
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Messages Container */}
      {isExpanded && (
        <>
          <div ref={messagesContainerRef} className="ai-chat-assistant__messages" role="log" aria-live="polite" aria-relevant="additions text">
            {messages.length === 0 ? (
              <div className="ai-chat-assistant__welcome">
                <h4 className="ai-chat-assistant__welcome-title">
                  Welcome to Trek Assistant! 👋
                </h4>
                <p className="ai-chat-assistant__welcome-text">
                  Ask me anything about treks, routes, difficulty levels, or travel recommendations.
                </p>
              </div>
            ) : (
              messages.map(message => (
                <div
                  key={message.id}
                  className={`ai-chat-assistant__message ai-chat-assistant__message--${message.role}`}
                >
                  {message.role === 'assistant' && (
                    <span className="ai-chat-assistant__message-avatar">🤖</span>
                  )}
                  
                  <div className="ai-chat-assistant__message-bubble">
                    <p className="ai-chat-assistant__message-content">
                      {message.content}
                    </p>
                    <span className="ai-chat-assistant__message-time">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>

                  {message.role === 'user' && (
                    <span className="ai-chat-assistant__message-avatar">👤</span>
                  )}
                </div>
              ))
            )}

            {/* Loading Indicator */}
            {loading && (
              <div className="ai-chat-assistant__message ai-chat-assistant__message--assistant">
                <span className="ai-chat-assistant__message-avatar">🤖</span>
                <div className="ai-chat-assistant__message-bubble">
                  <Loader size="small" />
                  <span className="ai-chat-assistant__loading-text">Assistant is thinking...</span>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="ai-chat-assistant__error-message">
                <svg className="ai-chat-assistant__error-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                </svg>
                <span>{error}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {quickActions && quickActions.length > 0 && !loading && (
            <div className="ai-chat-assistant__quick-actions">
              <p className="ai-chat-assistant__quick-actions-label">Quick actions:</p>
              <div className="ai-chat-assistant__quick-actions-buttons">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className="ai-chat-assistant__quick-action-btn"
                    onClick={() => handleQuickAction(action)}
                    type="button"
                  >
                    {action.icon && <span className="ai-chat-assistant__action-icon">{action.icon}</span>}
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="ai-chat-assistant__form">
            <div className="ai-chat-assistant__input-wrapper">
              <input
                ref={inputRef}
                type="text"
                className="ai-chat-assistant__input"
                placeholder="Ask about treks, routes, difficulty..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={loading}
              />
              <button
                type="submit"
                className="ai-chat-assistant__send-btn"
                disabled={!inputValue.trim() || loading}
                aria-label="Send message"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 C22.9702544,11.6889879 22.9702544,11.6889879 22.9702544,11.6889879 L4.13399899,2.89157193 C3.34915502,2.62349521 2.40734225,2.73405433 1.77946707,3.20570669 C0.994623095,3.83424562 0.837654326,4.92358389 1.15159189,5.70923127 L3.03521743,12.1502242 C3.03521743,12.3073216 3.19218622,12.4644191 3.50612381,12.4644191 L16.6915026,13.2599618 C16.6915026,13.2599618 17.1624089,13.2599618 17.1624089,12.8886696 L17.1624089,12.0441067 C17.1624089,11.8870093 17.1624089,11.4744748 16.6915026,11.4744748 Z"/>
                </svg>
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

AIChatAssistant.propTypes = {
  onSendMessage: PropTypes.func,
  apiProvider: PropTypes.oneOf(['chatgpt', 'gemini', 'other']),
  initialMessage: PropTypes.string,
  quickActions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string,
      icon: PropTypes.string
    })
  ),
  trek: PropTypes.object,
  location: PropTypes.object,
};

AIChatAssistant.defaultProps = {
  onSendMessage: null,
  apiProvider: 'chatgpt',
  initialMessage: 'Hi! I\'m your trek assistant. Ask me about any trek or travel recommendations!',
  quickActions: [
    { label: 'Popular treks', icon: '⛰️', value: 'Show me popular treks' },
    { label: 'Beginner friendly', icon: '👶', value: 'Show me beginner friendly treks' },
    { label: 'Hardest treks', icon: '💪', value: 'Show me the hardest treks' },
    { label: 'Near me', icon: '📍', value: 'Find treks near me' },
    { label: 'Weather forecast', icon: '🌤️', value: 'Get weather forecast for my area' },
    { label: 'Safety alerts', icon: '⚠️', value: 'Check safety alerts in my area' }
  ],
  trek: null,
  location: null
};

export default AIChatAssistant;

/**
 * useChatGPT Hook
 * Custom hook for integrating ChatGPT functionality
 * Manages chat state, message history, and AI responses
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import ChatGPTService from '../api/chatgptService';

/**
 * Custom hook for ChatGPT integration
 * @param {Object} options - Configuration options
 * @returns {Object} Chat interface with messages, send, clear, etc
 */
export const useChatGPT = (options = {}) => {
  const { autoInitialize = true } = options;

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);
  const messageQueueRef = useRef([]);

  /**
   * Initialize chat session
   */
  const initializeChat = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ChatGPTService.initializeChat();
      setSessionId(response.sessionId);
      if (response.welcomeMessage) {
        setMessages([
          {
            id: Date.now(),
            role: 'assistant',
            content: response.welcomeMessage,
            timestamp: new Date(),
          },
        ]);
      }
    } catch (err) {
      console.error('[useChatGPT] Initialize error:', err);
      setError('Failed to initialize chat. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Send a message to ChatGPT
   */
  const sendMessage = useCallback(
    async (content) => {
      if (!content.trim()) return;
      if (!sessionId) {
        setError('Chat not initialized. Please refresh and try again.');
        return;
      }

      // Add user message to UI immediately
      const userMessage = {
        id: Date.now(),
        role: 'user',
        content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setLoading(true);
      setError(null);

      try {
        const response = await ChatGPTService.sendMessage(content, sessionId);

        // Add AI response
        const assistantMessage = {
          id: Date.now() + 1,
          role: 'assistant',
          content: response.message || response.content,
          timestamp: new Date(),
          metadata: response.metadata,
        };

        setMessages((prev) => [...prev, assistantMessage]);

        // Scroll to bottom
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      } catch (err) {
        console.error('[useChatGPT] Send message error:', err);
        setError('Failed to get response. Please try again.');
        // Remove the user message if it failed
        setMessages((prev) => prev.filter((m) => m.id !== userMessage.id));
      } finally {
        setLoading(false);
      }
    },
    [sessionId]
  );

  /**
   * Get trek recommendations
   */
  const getRecommendations = useCallback(async (preferences) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ChatGPTService.getTrekRecommendations(preferences);

      const message = {
        id: Date.now(),
        role: 'assistant',
        content: response.recommendations || JSON.stringify(response),
        timestamp: new Date(),
        type: 'recommendations',
        data: response,
      };

      setMessages((prev) => [...prev, message]);
      return response;
    } catch (err) {
      console.error('[useChatGPT] Get recommendations error:', err);
      setError('Failed to get recommendations.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Generate packing list
   */
  const generatePackingList = useCallback(async (trekInfo) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ChatGPTService.generatePackingList(trekInfo);

      const message = {
        id: Date.now(),
        role: 'assistant',
        content: response.packingList || JSON.stringify(response),
        timestamp: new Date(),
        type: 'packing-list',
        data: response,
      };

      setMessages((prev) => [...prev, message]);
      return response;
    } catch (err) {
      console.error('[useChatGPT] Generate packing list error:', err);
      setError('Failed to generate packing list.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Get altitude advice
   */
  const getAltitudeAdvice = useCallback(async (altitude) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ChatGPTService.getAltitudeAdvice(altitude);

      const message = {
        id: Date.now(),
        role: 'assistant',
        content: response.advice || JSON.stringify(response),
        timestamp: new Date(),
        type: 'altitude-advice',
        data: response,
      };

      setMessages((prev) => [...prev, message]);
      return response;
    } catch (err) {
      console.error('[useChatGPT] Get altitude advice error:', err);
      setError('Failed to get altitude advice.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Get safety tips
   */
  const getSafetyTips = useCallback(async (trekInfo) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ChatGPTService.getSafetyTips(trekInfo);

      const message = {
        id: Date.now(),
        role: 'assistant',
        content: response.tips || JSON.stringify(response),
        timestamp: new Date(),
        type: 'safety-tips',
        data: response,
      };

      setMessages((prev) => [...prev, message]);
      return response;
    } catch (err) {
      console.error('[useChatGPT] Get safety tips error:', err);
      setError('Failed to get safety tips.');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Clear chat history
   */
  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
    messageQueueRef.current = [];
  }, []);

  /**
   * Clear error message
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  /**
   * End chat session
   */
  const endChat = useCallback(async () => {
    if (sessionId) {
      try {
        await ChatGPTService.endChat(sessionId);
      } catch (err) {
        console.error('[useChatGPT] End chat error:', err);
      }
    }
    setSessionId(null);
    clearChat();
  }, [sessionId, clearChat]);

  /**
   * Initialize on mount if enabled
   */
  useEffect(() => {
    if (autoInitialize) {
      initializeChat();
    }

    return () => {
      // Cleanup
      if (sessionId) {
        endChat();
      }
    };
  }, [autoInitialize, sessionId, initializeChat, endChat]);

  return {
    // State
    messages,
    loading,
    error,
    sessionId,

    // Methods
    sendMessage,
    initializeChat,
    clearChat,
    clearError,
    endChat,
    getRecommendations,
    generatePackingList,
    getAltitudeAdvice,
    getSafetyTips,

    // Ref
    messagesEndRef,
  };
};

export default useChatGPT;

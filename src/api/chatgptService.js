/**
 * ChatGPT Service
 * Handles all ChatGPT API interactions for AI-powered travel suggestions
 * Features:
 *  - Best trek recommendations
 *  - Packing list generation
 *  - Altitude acclimatization advice
 *  - General travel guidance
 */

import axiosInstance, { getCachedData, setCachedData } from './axiosInstance';

const CHATGPT_API_URL = import.meta.env.VITE_CHATGPT_API_URL;
const CHATGPT_API_KEY = import.meta.env.VITE_CHATGPT_API_KEY;
const USE_MOCK_DATA = !CHATGPT_API_URL && !CHATGPT_API_KEY;
const CACHE_KEY_PREFIX = 'chatgpt_';

/**
 * Chat message interface
 */
class ChatGPTService {
  /**
   * Initialize chat session with system context
   * @returns {Promise} Session ID and initial response
   */
  static async initializeChat() {
    if (USE_MOCK_DATA) {
      return { sessionId: 'mock-session-' + Date.now() };
    }
    
    try {
      if (CHATGPT_API_KEY) {
        // Direct OpenAI API integration
        return { sessionId: 'direct-api-' + Date.now() };
      }
      
      const response = await axiosInstance.post(`${CHATGPT_API_URL}/init`, {
        context: 'trek-guide',
        systemPrompt: 'You are an expert travel guide specializing in trekking and adventure travel. Provide helpful, accurate, and safety-conscious advice.',
      });
      return response.data;
    } catch (error) {
      console.error('[ChatGPT Service] Initialize chat error:', error);
      return { sessionId: 'fallback-session-' + Date.now() };
    }
  }

  /**
   * Send a message to ChatGPT
   * @param {string} message - User message
   * @param {string} sessionId - Chat session ID
   * @returns {Promise} AI response
   */
  static async sendMessage(message, sessionId) {
    if (USE_MOCK_DATA) {
      // Return mock response
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        text: `This is a mock response to: "${message}". To get real AI responses, configure VITE_CHATGPT_API_KEY or VITE_CHATGPT_API_URL in your .env file.`,
        sessionId
      };
    }
    
    try {
      if (CHATGPT_API_KEY) {
        // Direct OpenAI API call
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${CHATGPT_API_KEY}`
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: 'You are an expert travel guide specializing in trekking and adventure travel. Provide helpful, accurate, and safety-conscious advice.'
              },
              {
                role: 'user',
                content: message
              }
            ],
            max_tokens: 500,
            temperature: 0.7
          })
        });
        
        const data = await response.json();
        return {
          text: data.choices?.[0]?.message?.content || 'Sorry, I could not process your request.',
          sessionId
        };
      }
      
      const response = await axiosInstance.post(`${CHATGPT_API_URL}/chat`, {
        message,
        sessionId,
      });
      
      return response.data;
    } catch (error) {
      console.error('[ChatGPT Service] Send message error:', error);
      return {
        text: 'Sorry, I\'m having trouble connecting right now. Please try again later.',
        sessionId
      };
    }
  }

  /**
   * Get trek recommendations based on preferences
   * @param {Object} preferences - User preferences (difficulty, duration, region, etc)
   * @returns {Promise} AI recommendations
   */
  static async getTrekRecommendations(preferences) {
    try {
      const cacheKey = `${CACHE_KEY_PREFIX}recommendations_${JSON.stringify(preferences)}`;
      const cached = getCachedData(cacheKey);
      if (cached) {
        return cached;
      }

      const response = await axiosInstance.post(`${CHATGPT_API_URL}/recommendations`, {
        preferences,
      });

      if (response.data) {
        setCachedData(cacheKey, response.data);
      }

      return response.data;
    } catch (error) {
      console.error('[ChatGPT Service] Get recommendations error:', error);
      throw error;
    }
  }

  /**
   * Generate a packing list for a specific trek
   * @param {Object} trekInfo - Trek details (altitude, season, difficulty, etc)
   * @returns {Promise} Customized packing list
   */
  static async generatePackingList(trekInfo) {
    try {
      const cacheKey = `${CACHE_KEY_PREFIX}packing_${trekInfo.trekId}`;
      const cached = getCachedData(cacheKey);
      if (cached) {
        return cached;
      }

      const response = await axiosInstance.post(`${CHATGPT_API_URL}/packing-list`, {
        trekInfo,
      });

      if (response.data) {
        setCachedData(cacheKey, response.data);
      }

      return response.data;
    } catch (error) {
      console.error('[ChatGPT Service] Generate packing list error:', error);
      throw error;
    }
  }

  /**
   * Get altitude acclimatization advice
   * @param {number} altitude - Maximum altitude in meters
   * @param {string} terrain - Terrain type (mountains, plateau, etc)
   * @returns {Promise} Acclimatization advice
   */
  static async getAltitudeAdvice(altitude, terrain = 'mountain') {
    try {
      const cacheKey = `${CACHE_KEY_PREFIX}altitude_${altitude}`;
      const cached = getCachedData(cacheKey);
      if (cached) {
        return cached;
      }

      const response = await axiosInstance.post(`${CHATGPT_API_URL}/altitude-advice`, {
        altitude,
        terrain,
      });

      if (response.data) {
        setCachedData(cacheKey, response.data);
      }

      return response.data;
    } catch (error) {
      console.error('[ChatGPT Service] Get altitude advice error:', error);
      throw error;
    }
  }

  /**
   * Get safety tips for a trek
   * @param {Object} trekInfo - Trek details
   * @returns {Promise} Safety recommendations
   */
  static async getSafetyTips(trekInfo) {
    try {
      const cacheKey = `${CACHE_KEY_PREFIX}safety_${trekInfo.trekId}`;
      const cached = getCachedData(cacheKey);
      if (cached) {
        return cached;
      }

      const response = await axiosInstance.post(`${CHATGPT_API_URL}/safety-tips`, {
        trekInfo,
      });

      if (response.data) {
        setCachedData(cacheKey, response.data);
      }

      return response.data;
    } catch (error) {
      console.error('[ChatGPT Service] Get safety tips error:', error);
      throw error;
    }
  }

  /**
   * Get travel tips and tricks
   * @param {string} topic - Topic (nutrition, fitness, equipment, etc)
   * @returns {Promise} Travel tips
   */
  static async getTravelTips(topic) {
    try {
      const cacheKey = `${CACHE_KEY_PREFIX}tips_${topic}`;
      const cached = getCachedData(cacheKey);
      if (cached) {
        return cached;
      }

      const response = await axiosInstance.post(`${CHATGPT_API_URL}/travel-tips`, {
        topic,
      });

      if (response.data) {
        setCachedData(cacheKey, response.data);
      }

      return response.data;
    } catch (error) {
      console.error('[ChatGPT Service] Get travel tips error:', error);
      throw error;
    }
  }

  /**
   * End chat session
   * @param {string} sessionId - Chat session ID
   * @returns {Promise}
   */
  static async endChat(sessionId) {
    try {
      const response = await axiosInstance.post(`${CHATGPT_API_URL}/end`, {
        sessionId,
      });
      return response.data;
    } catch (error) {
      console.error('[ChatGPT Service] End chat error:', error);
      // Don't throw - this is cleanup
    }
  }
}

export default ChatGPTService;

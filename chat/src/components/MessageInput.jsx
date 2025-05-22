import React, { useState } from 'react';
import { Send, Smile } from 'lucide-react'; // Icons
import axios from 'axios';
import EmojiPicker from 'emoji-picker-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'; // API URL (from environment or default localhost)

// Main component
const MessageInput = ({
  setMessages,       // Function to update messages in the parent component
  selectedModel,     // Selected AI model
  setChatHistory,    // Function to update the chat history
  selectedChatId,    // ID of the currently selected chat
}) => {
  const [inputMessage, setInputMessage] = useState('');       // Message typed in the input
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Controls emoji picker visibility
  const [loading, setLoading] = useState(false);              // Loading state (sending message)

  // Updates the chat history with a new message
  const updateChatHistory = (message, sender) => {
    setChatHistory(prevChats => {
      const existingChatIndex = prevChats.findIndex(chat => chat.id === selectedChatId);

      // If the chat exists, update its messages
      if (existingChatIndex !== -1) {
        const updatedChats = [...prevChats];
        const updatedChat = { ...updatedChats[existingChatIndex] };

        updatedChat.messages = [...(updatedChat.messages || []), { text: message, sender }];
        updatedChats[existingChatIndex] = updatedChat;

        return updatedChats;

      } else {
        // If it doesn't exist, create a new chat with the first message
        const newChat = {
          id: selectedChatId,
          title: "My First Chat",
          createdAt: new Date().toISOString(),
          messages: [{ text: message, sender }]
        };
        return [newChat, ...prevChats];
      }
    });
  };

  // Function to send the user's message to the AI
  const sendMessage = async () => {
    if (!inputMessage.trim() || loading) return; // Prevents empty or duplicate submissions

    const userMessage = inputMessage;
    const modelToSend = selectedModel;
    setInputMessage(''); // Clears the input after sending

    // Adds the user's message to the UI and history
    setMessages(prev => [...prev, { text: userMessage, sender: "me" }]);
    updateChatHistory(userMessage, "me");

    setLoading(true);

    try {
      // Sends the message to the API
      const response = await axios.post(`${API_URL}/api/gemini`, {
        prompt: userMessage,
        model: modelToSend
      });

      const botResponse = response.data.response;

      // Adds the AI's response to the UI and history
      setMessages(prev => [...prev, { text: botResponse, sender: "tars" }]);
      updateChatHistory(botResponse, "tars");

    } catch (error) {
      // In case of an error, displays a default message
      console.error(`Error communicating with the AI: ${error}`);
      const errorMsg = 'Error connecting to the AI.';
      setMessages(prev => [...prev, { text: errorMsg, sender: "tars" }]);
      updateChatHistory(errorMsg, "tars");
    }

    setLoading(false);
  };

  // Sends the message when "Enter" is pressed
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // Selects an emoji and adds it to the input
  const handleEmojiSelect = (emoji) => {
    setInputMessage(prev => prev + emoji.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <>
      <div className="message-input__container flex items-center gap-2 p-2 bg-[#1E1E1E] rounded-lg">
        
        {/* Message input field */}
        <input
          type="text"
          placeholder="Message to Miranda..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-[#FFF2D7] p-2"
        />

        {/* Parent div for buttons */}
        <div className="area-buttons flex items-center gap-2">
          {/* Button to send the message */}
          <button
            onClick={sendMessage}
            className="text-white"
            disabled={loading}
          >
            <Send size={22} />
          </button>

          {/* Button to show/hide emoji picker */}
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="text-white"
          >
            <Smile size={22} />
          </button>

          {/* Emoji picker (conditionally rendered) */}
          {showEmojiPicker && (
            <div className="emoji-picker__container ml-2">
              <EmojiPicker onEmojiClick={handleEmojiSelect} theme="dark" />
            </div>
          )}
        </div>
      </div>
      
      {/* Footer text about TARS being experimental */}
      <div className="end-text font-light text-gray-400 py-1.5 text-center text-sm">
        <p> Miranda is experimental and may make mistakes. Be sure to check the information. </p>
      </div>
    </>
  );
};

export default MessageInput;

// Import necessary components and icons
import { DivideCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import RippleEffect from "./RippleEffect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

// Mapping of AI models by label to their actual code
const modelMap = {
  "Gemini 1.5 Flash": "gemini-1.5-flash",
  "Gemini 1.5 Flash 8B": "gemini-1.5-flash-8b",
  "Gemini 2.0 Flash": "gemini-2.0-flash",
  "Gemini 1.5 Pro": "gemini-1.5-pro",
};

const Sidebar = ({
  isOpen, // Whether the sidebar is open or closed
  toggleMenu, // Function to open/close the sidebar
  selectedModel, // Currently selected AI model
  onModelChange, // Callback when the model changes
  onNewChat, // Callback to create a new chat
  chatHistory = [], // Chat history displayed in the sidebar
  onSelectChat, // Callback to select a chat
  selectedChatId, // ID of the currently selected chat
  onDeleteChat, // Callback to delete a chat
  credits, // Remaining credits
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Controls the dropdown for model selection
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    joinDate: ''
  });
  const navigate = useNavigate();

  // Fetch user information on component mount
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem('token');
        
        if (token) {
          // Option 1: Check localStorage first for user data
          const storedUser = localStorage.getItem('userInfo');
          if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserInfo({
              username: parsedUser.username || 'User',
              email: parsedUser.email || 'user@example.com',
              joinDate: parsedUser.created_at ? new Date(parsedUser.created_at).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric' 
              }) : new Date().toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric' 
              })
            });
            return; // Exit early if we have user data in localStorage
          }

          // Option 2: If no localStorage data, fetch from API
          const apiUrl = import.meta.env.VITE_API_URL;
          const response = await fetch(`${apiUrl}/api/home`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          
          if (response.ok) {
            const userData = await response.json();
            const userInfoData = {
              username: userData.user.username || 'User',
              email: userData.user.email || 'user@example.com',
              joinDate: userData.user.created_at ? new Date(userData.user.created_at).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric' 
              }) : new Date().toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric' 
              })
            };
            
            // Save to localStorage for future use
            localStorage.setItem('userInfo', JSON.stringify(userData.user));
            setUserInfo(userInfoData);
          } else {
            // Fallback to default values
            setUserInfo({
              username: 'User',
              email: 'user@example.com',
              joinDate: new Date().toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric' 
              })
            });
          }
        } else {
          // No token found, redirect to login
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        // Set default values if API call fails
        setUserInfo({
          username: 'User',
          email: 'user@example.com',
          joinDate: new Date().toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric' 
          })
        });
      }
    };

    fetchUserInfo();
  }, [navigate]);

  // Function called when changing the AI model
  const handleModelChange = (modelLabel) => {
    const modelCode = modelMap[modelLabel];
    onModelChange(modelCode);
    setIsDropdownOpen(false);
  };

  // Helper functions to check if a chat is from today or yesterday
  const isToday = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isYesterday = (dateStr) => {
    const date = new Date(dateStr);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return date.toDateString() === yesterday.toDateString();
  };

  // Filter chats by date
  const chatsToday = chatHistory.filter(chat => isToday(chat.createdAt));
  const chatsYesterday = chatHistory.filter(chat => isYesterday(chat.createdAt));

  return (
    <>
      {/* Toast for feedback on model changes */}
      {/* <Toaster position="top-center" reverseOrder={false} /> */}

      {/* Overlay to darken the background when the sidebar is open */}
      <div className={`overlay ${isOpen ? "show" : ""}`} onClick={toggleMenu}></div>

      {/* Main sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>

        {/* Sidebar header */}
        <div className="sidebar-header">
          <button className="close-btn rounded-full w-12 h-12" onClick={toggleMenu}> X </button>

          {/* Avatar and model dropdown */}
          <div className="avatar-profile">
            <div className="header-avatar flex items-center gap-4 p-6">
              <img className="w-16 h-16 mr-2 rounded-full cursor-pointer" src="https://i.pinimg.com/736x/8d/12/49/8d1249009c78480d4f773714179f8d8f.jpg" alt="Avatar" />
              <div className="font-medium dark:text-white">
                <div className="text-sm"> {userInfo.username} - <span className="text-gray-400"> Joined on {userInfo.joinDate} </span></div>
                <div className="text-sm mt-1 text-gray-500 dark:text-gray-400">
                  Free Plan
                  <button className="dropdown font-medium rounded-lg text-sm px-2 py-2 ml-4 mt-1 text-center inline-flex items-center cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    {selectedModel}
                    <svg className="w-2 h-2 ms-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 6" fill="none">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                  </button>

                  {/* Dropdown for model selection */}
                  <div className={`z-10 w-44 absolute right-2.5 mt-2 rounded-lg shadow-lg`} style={{
                    background: "linear-gradient(45deg, #232428, #27282D)",
                    transition: "opacity 0.3s ease, transform 0.3s ease",
                    opacity: isDropdownOpen ? "1" : "0",
                    transform: isDropdownOpen ? "translateY(0)" : "translateY(-10px)",
                    pointerEvents: isDropdownOpen ? "auto" : "none"
                  }}>
                    <div className="px-4 py-3 text-sm text-white">
                      <div> {userInfo.username} </div>
                      <div className="font-medium truncate text-gray-400"> {userInfo.email} </div>
                    </div>
                    <ul className="py-2 text-sm text-gray-300">
                      {Object.keys(modelMap).map((model) => (
                        <li key={model}>
                          <button className="block w-full text-left px-4 py-2 hover:text-gray-500 cursor-pointer" onClick={() => handleModelChange(model)}>
                            {model}
                          </button>
                        </li>
                      ))}
                    </ul>
                    <div className="py-2">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:text-white">
                        Settings
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Button to create a new chat */}
        <RippleEffect className="create-new-chat w-full" onClick={() => onNewChat("New Chat")}> Create New Chat </RippleEffect>

        {/* Chat history */}
        <div className="chat-history">

          {/* Chats from today */}
          {chatsToday.length > 0 && (
            <div className="today">
              <div className="flex justify-between text-2xl font-light text-white mb-2">
                <span> Today </span>
                <span className="credits">{credits} Credits Remaining</span>
              </div>
              <ul className="summary-list space-y-2">
                {chatsToday.map((chat) => (
                  <li key={chat.id}>
                    <RippleEffect
                      onClick={() => onSelectChat(chat.id)}
                      className={`item w-full flex items-center justify-between p-2 rounded-md ${
                        selectedChatId === chat.id ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {chat.title}
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-xl text-[#FFF2D7] hover:text-red-400"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteChat(chat.id);
                        }}
                      />
                    </RippleEffect>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Chats from yesterday */}
          {chatsYesterday.length > 0 && (
            <div className="yesterday mt-6">
              <div className="flex justify-between text-2xl font-light text-white mb-2">
                <span> Yesterday </span>
              </div>
              <ul className="summary-list space-y-2">
                {chatsYesterday.map((chat) => (
                  <li key={chat.id}>
                    <button
                      onClick={() => onSelectChat(chat.id)}
                      className={`item w-full flex items-center justify-between p-2 rounded-md ${
                        selectedChatId === chat.id ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {chat.title}
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-xl text-[#FFF2D7] hover:text-red-400"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteChat(chat.id);
                        }}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Welcome message when no chats exist */}
          {chatsToday.length === 0 && chatsYesterday.length === 0 && (
            <div className="no-chats text-center text-white mt-10">
              <h2 className="text-3xl font-semibold mb-2"> Welcome! </h2>
              <p className="text-gray-400 mb-4"> Your message history is empty, please create a new room to continue. </p>

              <RippleEffect className="bg-[#FFF2D7] text-black cursor-pointer px-6 py-4 rounded-full font-light">
                <a href="https://discord.gg/jqdp6d2m" target="_blank"> Visit The Discord Community </a>
              </RippleEffect>
            </div>
          )}

        </div>

        {/* Button to redirect to My CodeBook */}
        <div className="upgrade-plan flex items-center p-4 bg-gray-800 rounded-lg mt-6 cursor-pointer">
          <DivideCircle className="mr-4 text-gray-900" />
          <div className="text" onClick={() => navigate("/my-codebooks")}>
            <h2 className="text-lg font-semibold"> Create My CodeBooks </h2>
            <p className="text-sm"> Create and organize your notes in CodeBooks </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

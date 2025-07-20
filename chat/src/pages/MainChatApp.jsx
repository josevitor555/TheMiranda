import React from 'react';

// Global styles and libraries
import '../input.css'

// import '../katex.min.css'

import '../App.css'

// UUID to uniquely identify chats
import { v4 as uuidv4 } from 'uuid';

// Interface components
import PageHeader from '../components/Header';
import ChatMessages from '../components/ChatMessages';
import MessageInput from '../components/MessageInput';
import Sidebar from '../components/Sidebar';
import NewChatModal from '../components/NewChatModal';
import { Toast } from 'primereact/toast';
// import ShareModal from './components/ShareModal';

// Wave Surfer Component
import WaveformPlayer from '../components/WaveSurfer'; // Agora o import está certo

// React hooks
import { useEffect, useRef, useState } from 'react';

const MainChatApp = () => {

    // State to control the sidebar menu visibility
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Messages of the current chat
    const [messages, setMessages] = useState([]);

    // Selected AI model (default: gemini)
    const [selectedModel, setSelectedModel] = useState('gemini-1.5-flash');

    // State for generated audios
    const [audioUrls, setAudioUrls] = useState({});
    const [lastAudioId, setLastAudioId] = useState(null);

    // State for the visibility of the new chat modal
    const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);

    // Chat history
    const [chatHistory, setChatHistory] = useState([]);

    // ID of the currently selected chat
    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    // State to control the selected chat
    const [selectedChatId, setSelectedChatId] = useState(null);

    // State to control available credits
    const [credits, setCredits] = useState(5); // Example state for remaining credits
    const toastRef = useRef(null);

    // State for controller share modal component
    // const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    const handleCredits = () => {
        setCredits((prevCredits) => prevCredits - 1); // Subtracts 1 credit
    };

    /**
     * 1 - Creates a new chat with a custom title
     * 2 - Clears previous messages and closes the modal
    */
    const handleNewChat = (chatName) => {
        const newChat = {
            id: uuidv4(),
            title: chatName,
            createdAt: new Date().toISOString(),
            messages: [],
        };

        // Adds the new chat to the history
        setChatHistory((prev) => [newChat, ...prev]);
        setMessages([]); // Clears the current chat
        setSelectedChatId(newChat.id); // Sets it as the current chat
        setIsNewChatModalOpen(false); // Closes the modal
    };

    /**
     * 1 - Selects an existing chat by ID and loads its messages
     */
    const handleSelectChat = (chatId) => {
        const selectedChat = chatHistory.find((chat) => chat.id === chatId);
        if (selectedChat) {
            setMessages(selectedChat.messages);
            setSelectedChatId(chatId);
        }
    };

    /**
     * 1 - Deletes a specific chat from the history
     * 2 - If it's the current chat, clears the interface
     */
    const handleDeleteChat = (chatId) => {
        setChatHistory((prev) => prev.filter((chat) => chat.id !== chatId));
        if (selectedChatId === chatId) {
            setSelectedChatId(null);
            setMessages([]);
        }
    };

    /**
     * 1 - Effect to save messages of the current chat in the history,
     * 2 - Synchronizing changes
     */
    useEffect(() => {
        if (!selectedChatId) return;
        setChatHistory((prevHistory) =>
            prevHistory.map((chat) =>
                chat.id === selectedChatId ? { ...chat, messages } : chat
            )
        );
    }, [messages, selectedChatId]);

    // If credits are depleted
    if (credits <= 0) {
        return (
            <div className="empty-credits flex flex-col items-center justify-center h-screen text-center p-6">
                <div className='empty-credits__container'>
                    <h1 className="text-2xl font-semibold text-white"> Credits Empty </h1>
                    <p className="mt-2 text-gray-400"> The credits are gone, you can come back in a month or enjoy it today. </p>
                    <button className="mt-4 px-4 py-2 bg-[#FFF2D7] text-black rounded-full cursor-pointer">
                        Update Plan
                    </button>
                </div>
            </div>
        );
    }

    // const handleOpenShareModal = () => {
    //   setIsShareModalOpen(true);
    // };
    return (
        <div className="app">

            {/* Page header */}
            <PageHeader
                toggleMenu={toggleMenu}
                audioUrl={audioUrls[lastAudioId]}
                setChatHistory={setChatHistory}
                selectedChatId={selectedChatId}
                selectedChat={chatHistory.find(chat => chat.id === selectedChatId)} />

            {/* Sidebar with models, history, and new chat button */}

            <Sidebar
                isOpen={isMenuOpen}
                toggleMenu={toggleMenu}
                selectedModel={selectedModel}
                onModelChange={setSelectedModel}
                onNewChat={() => setIsNewChatModalOpen(true)}
                chatHistory={chatHistory}
                setChatHistory={setChatHistory}
                onSelectChat={handleSelectChat}
                selectedChatId={selectedChatId}
                onDeleteChat={handleDeleteChat}
                // handleCredits={handleCredits}
                credits={credits} // Passing credits to the Sidebar
            />

            {/* Main chat area */}
            <div className="chat__container">
                <ChatMessages
                    messages={messages}
                    setAudioUrls={setAudioUrls}
                    setLastAudioId={setLastAudioId} />

                {audioUrls[lastAudioId] && (
                    <WaveformPlayer audioUrl={audioUrls[lastAudioId]} />
                )}
            </div>

            {/* Input field to write and send messages */}
            <MessageInput
                messages={messages}
                setMessages={setMessages}
                selectedModel={selectedModel}
                chatHistory={chatHistory}
                setChatHistory={setChatHistory}
                selectedChatId={selectedChatId} />

            {/* New chat creation modal */}
            <Toast ref={toastRef} position='top-right' className='text-white' />
            
            <NewChatModal
                isOpen={isNewChatModalOpen}
                onClose={() => setIsNewChatModalOpen(false)}
                onCreate={handleNewChat}
                credits={credits} // Passing credits to the modal
                handleCredits={handleCredits} // Passing the function to subtract credits
                toastRef={toastRef} />

            {/* Share Modal */}
            {/* <ShareModal
            isOpen={isShareModalOpen}
            onClose={() => setIsShareModalOpen(false)}
          /> */}

        </div>
    );
}

export default MainChatApp;

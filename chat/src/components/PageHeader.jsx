import { useEffect, useState } from "react";
import { Menu, Pen, DiamondPercent } from "lucide-react";  // Menu, edit, and highlight icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faX } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-regular-svg-icons";
// import { faSun } from "@fortawesome/free-brands-svg-icons";
// import WaveformPlayer from "./WaveSurfer";  // Audio player component with waveform

const MAX_TITLE_LENGTH = 50; // Sets the character limit for the title

const PageHeader = ({ toggleMenu, setChatHistory, selectedChatId, selectedChat }) => {
  const [title, setTitle] = useState(""); // State for the title
  const [isEditing, setIsEditing] = useState(false); // Determines if the field is in edit mode

  // Activates editing on click
  const handleEditClick = () => setIsEditing(true);

  useEffect(() => {
    // If it's a new chat, use the placeholder
    if (selectedChatId && (!selectedChat?.title || selectedChat.title.trim() === "")) {
      setTitle("Create a title");
    } else if (selectedChat?.title) {
      setTitle(selectedChat.title);
    }
  }, [selectedChatId, selectedChat?.title]);

  const handleBlur = () => {
    setIsEditing(false);

    // Update the title of the corresponding chat in the global state
    if (selectedChatId) {
      setChatHistory(prevChats =>
        prevChats.map(chat =>
          chat.id === selectedChatId ? { ...chat, title: title } : chat
        )
      );
    }
  };

  // Updates the title if it's within the character limit
  const handleChange = (e) => {
    if (e.target.value.length <= MAX_TITLE_LENGTH) {
      setTitle(e.target.value);
    }
  };

  return (
    <div className="header text-black p-6 items-center w-full flex justify-between sticky top-0 z-10">
      
      {/* If there is audio, render the waveform player */}
      {/* {audioUrl && <WaveformPlayer audioUrl={audioUrl} />} */}

      {/* Button that calls the toggleMenu function to open the sidebar */}
      <button className="menu rounded-full p-2" onClick={toggleMenu}>
        <Menu className="w-8 h-8" />
      </button>

      {/* Area that displays or edits the title */}
      <div className="prev-title">
        {isEditing ? (
          // Input appears when editing
          <input
            type="text"
            value={title}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
            className="bg-transparent border-b border-gray-500 focus:outline-none text-lg"
          />
        ) : (
          // Static title with click to activate editing
          <span className="text-lg font-medium cursor-pointer" onClick={handleEditClick}>
            {title}
          </span>
        )}

        {/* Pen icon to indicate editing, but it's not clickable yet */}
        <div className="pen-icon">
          <Pen size={20} />
        </div>
      </div>

      {/* Application logo with icon */}
      <div className="logo flex rounded-2xl px-6 py-2 cursor-pointer">
        <div className="text-2xl font-light text-center"> MIRANDA </div>
        <FontAwesomeIcon icon={faSun} className="ml-3 text-2xl" />
      </div>
    </div>
  );
};

export default PageHeader;

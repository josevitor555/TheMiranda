// Import the necessary components for the modal functionality.
import RippleEffect from "./RippleEffect";
import { useState } from "react";

// Theme toast from Prime React Lib
import 'primereact/resources/themes/lara-light-indigo/theme.css';

import { Check } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from "@fortawesome/free-solid-svg-icons";
// import { faHippo } from "@fortawesome/free-regular-svg-icons";
import { faPython, faJava, faJs, faHtml5, faCss3, faReact } from "@fortawesome/free-brands-svg-icons";

// Modal component for creating a new chat.
const NewChatModal = ({
  isOpen,
  onClose,
  onCreate,
  handleCredits,
  credits,
  toastRef
}) => {
  const handleNewChatClick = () => {
    onCreate(chatName);
    handleCredits();
  };

  const [options, setOptions] = useState({
    generateImage: false,
    generateCode: false,
    analyzeImages: false,
    generatePDF: false,
    surfTheinternet: false,
    generateAudio: false,
  });

  const [chatName, setChatName] = useState("");

  // const toast = useRef(null);

  // React-hot-toast structure
  // Updates credits when they change
  // useEffect(() => {
  //   if (credits !== undefined) {
  //     toast.success(`Current Credits: ${credits}`);
  //   }
  // }, [credits]); // Now, useEffect depends on `credits` to execute only when necessary

  // Primereact/toast structure for onClick
  const showCreditsToast = () => {
    setTimeout(() => {
      toastRef?.current?.show({
        label: "Info",
        severity: "info",
        summary: "Credits Updated",
        detail: `You have ${credits} credits left.`,
        life: 3000,
      });
    }, 100);
  };

  // Handle checkbox
  const handleCheckboxChange = (key) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [key]: !prevOptions[key],
    }));
  };

  const checkboxOptions = [
    { key: "python", label: "Python", icon: <FontAwesomeIcon icon={faPython} className="w-8 h-8 opacity-25 group-hover:opacity-100 transition-opacity duration-200" /> },
    { key: "java", label: "Java", icon: <FontAwesomeIcon icon={faJava} className="w-8 h-8 opacity-25 group-hover:opacity-100 transition-opacity duration-200" /> },
    { key: "javascript", label: "JavaScript", icon: <FontAwesomeIcon icon={faJs} className="w-8 h-8 opacity-25 group-hover:opacity-100 transition-opacity duration-200" /> },
    { key: "html", label: "HTML", icon: <FontAwesomeIcon icon={faHtml5} className="w-8 h-8 opacity-25 group-hover:opacity-100 transition-opacity duration-200" /> },
    { key: "css", label: "CSS", icon: <FontAwesomeIcon icon={faCss3} className="w-8 h-8 opacity-25 group-hover:opacity-100 transition-opacity duration-200" /> },
    { key: "React", label: "React", icon: <FontAwesomeIcon icon={faReact} className="w-8 h-8 opacity-25 group-hover:opacity-100 transition-opacity duration-200" /> },
  ];

  // If the modal is not open, return null (do not render anything)
  if (!isOpen) return null;

  return (
    <div className="new-chat__modal fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">

      {/* <Toast ref={toast} /> */}
      {/* <Toast ref={toastRef} /> */}
      
      <div className="container__content p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-light text-center text-white mb-6 tracking-wide">
          Create New Chat Room
        </h2>

        {/* Button to close the modal */}
        <button className="close-button rounded-full" onClick={onClose}>
          <FontAwesomeIcon icon={faX} />
        </button>

        <div className="border-t border-zinc-700 mb-6" />

        {/* Input field for the chat name */}
        <label className="block text-white font-light mb-2 text-sm">
          Enter Room Name
        </label>
        <input
          type="text"
          placeholder="Enter chat name..."
          value={chatName}
          onChange={(e) => setChatName(e.target.value)}
          className="w-full p-3 mb-6 rounded-md border border-zinc-700 text-white placeholder-zinc-500 bg-zinc-800 text-sm"
        />

        <div className="border-t border-zinc-700 mb-6" />

        {/* Additional feature options */}
        <label className="block text-white font-light mb-2 text-sm">
          Select the language for your CodeBook theme
        </label>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {checkboxOptions.map(({ key, label, icon }) => (
            <label
              key={key}
              className="group relative flex flex-col items-center justify-center 
              border border-zinc-700 rounded-md p-4 w-full text-white 
              cursor-pointer hover:border-white transition-all 
              transform hover:scale-105 duration-300 ease-in-out"
            >
              <input
                type="checkbox"
                checked={options[key]}
                onChange={() => handleCheckboxChange(key)}
                className="sr-only"
                id={`option-${key}`}
              />

              <div className="absolute top-2 right-2 w-5 h-5 border-2 border-white rounded-sm flex items-center justify-center transition-all bg-zinc-800 group-hover:bg-white/10">
                {options[key] && (
                  <span className="text-white text-xs font-bold">
                    <Check />
                  </span>
                )}
              </div>

              <div className="text-2xl mb-2">{icon}</div>

              <span className="text-center">{label}</span>
            </label>
          ))}
        </div>

        {/* Button to create a new chat */}
        <RippleEffect onClick={() => {
            handleNewChatClick();
            showCreditsToast();
          }} className="create-button w-full text-white text-center rounded-md p-3">
            Create Chat
        </RippleEffect>


        {/* <button onClick={() => {
          toastRef?.current?.show({
            severity: "info",
            summary: "Test Toast",
            detail: "It worked!",
            life: 3000,
          });
        }}> Toast Test </button> */}
      </div>
    </div>
  );
};

export default NewChatModal;

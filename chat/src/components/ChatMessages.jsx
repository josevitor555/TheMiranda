// React and necessary hooks
import React, { useEffect, useRef, useState } from "react";

// Generates unique IDs for messages
import { v4 as uuidv4 } from "uuid";

// Custom sound hook
import useSound from "use-sound";

// Welcome component
import ChatWelcome from "./ChatWelcome";

// Interactive icons
import { AudioLines } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
// import { faHippo } from "@fortawesome/free-regular-svg-icons";

// Ripple effect (animated button style)
import RippleEffect from "./RippleEffect";

// Markdown with GitHub Flavored Markdown support
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Syntax highlighting renderer
import highlightRenderers from "./SintaxeHighLighter";

// Component for generating PDFs from messages
import PdfGenerator from "./PdfGenerator";

// Feature: Export table to Excel format
import ExportTableToExcel from "./ExportTableToExcel";

// Message component
const ChatMessages = ({ messages, setAudioUrls, setLastAudioId }) => {
  const messagesEndRef = useRef(null); // Ref to scroll to the last message
  const [skeleton, setSkeleton] = useState(false); // Controls the animated loader

  // Sounds for sending and receiving messages
  const [playSendMessageSound] = useSound("../audios/user_incoming_message.mp3");
  const [playReceiveMessageSound] = useSound("../audios/response_notification.mp3");

  // Decide whether to play send or receive sound based on message changes
  useEffect(() => {
    if (messages.length === 0) return;

    const lastMessage = messages[messages.length - 1];

    if (lastMessage.sender === "me") {
      playSendMessageSound(); // Play sound when sending a message
      setSkeleton(true); // Show loading animation
    } else {
      playReceiveMessageSound(); // Play sound when receiving a message
      setSkeleton(false); // Hide loading animation
    }
  }, [messages, playReceiveMessageSound, playSendMessageSound]);

  // Automatically scroll to the last message smoothly
  useEffect(() => {
    if (messagesEndRef.current) {
      setTimeout(() => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages]);
  
  return (
    <div className="chat_session">
      <div className="chat-session__container">

        {/* Show welcome component if there are no messages */}
        {messages.length === 0 ? (
          <ChatWelcome />
        ) : (
          messages.map((message) => {
            // Iterate through messages to display each one
            return (
              <div key={message.id || uuidv4()} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
                <RippleEffect
                  className={`p-3 rounded-lg max-w-[100%] ${
                    message.sender === "me"
                      ? "bg-gray-900 text-white user__sender"
                      : "bg-gray-700 text-white bot__sender"
                  }`}
                >
                  {/* Render text with Markdown and support for code/blockquote */}
                  <div className="markdown-render">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        ...highlightRenderers,
                        p: ({ children }) => {
                          // Extract plain text even if wrapped in nested elements
                          const extractText = (children) =>
                            React.Children.toArray(children)
                              .map((child) => {
                                if (typeof child === "string") return child;
                                if (typeof child === "number") return String(child);
                                if (React.isValidElement(child)) {
                                  return extractText(child.props.children);
                                }
                                return "";
                              })
                              .join("");

                          const text = extractText(children).trim();
                          const hasLineBreaks = text.includes("\n");
                          const lines = text
                            .split("\n")
                            .map((line) => line.trim())
                            .filter((line) => line !== "");

                          if (!hasLineBreaks) {
                            return <p>{text}</p>;
                          }

                          // If it has exactly 14 lines, treat it as a sonnet
                          if (lines.length === 14) {
                            const stanzas = [
                              lines.slice(0, 4),
                              lines.slice(4, 8),
                              lines.slice(8, 11),
                              lines.slice(11, 14),
                            ];

                            return (
                              <div className="text-[#fafafa] font-serif italic space-y-6 whitespace-pre-line">
                                {stanzas.map((stanza, idx) => (
                                  <div
                                    key={idx}
                                    className="pl-4 border-l-2 border-[#fafafa] space-y-1"
                                  >
                                    {stanza.map((verse, i) => (
                                      <div key={i}>{verse}</div>
                                    ))}
                                  </div>
                                ))}
                              </div>
                            );
                          }
                          return <p> {text} </p>; // Fallback for regular multiline text
                        },
                        table: ({ children }) => (
                          <div className="overflow-x-auto pb-4">
                            <table className="min-w-full text-sm text-left text-white">
                              {children}
                            </table>
                        
                            {/* Export button */}
                            <div className="relative p-2 flex items-center justify-between border border-[#FFF2D7] rounded-2xl">
                              <span className="ml-4 text-white"> Export this table in .XLSX format </span>
                              <button
                                type="button"
                                aria-label="Export table"
                                className="group relative bg-[#FFF2D7] rounded-full py-3 px-6 focus:outline-none focus:ring-2 focus:ring-zinc-500 cursor-pointer"
                                onClick={ExportTableToExcel}
                              >
                                <div className="text-black font-light"> Export  </div>
                              </button>
                            </div>
                          </div>
                        ),
                      }}
                    >
                      {message.text}
                    </ReactMarkdown>
                  </div>

                  {/* Action buttons only for AI messages */}
                  {message.sender !== "me" && (
                    <div className="icons-min__box px-4 py-2 mt-4 border-none">
                      <ul className="flex gap-4">
                        {/* Audio generation button */}
                        <li>
                          <button
                            type="button"
                            className="icon-circle"
                            onClick={async () => {
                              try {
                                const response = await fetch("http://localhost:3001/api/generate-audio", {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({ text: message.text }),
                                });

                                if (!response.ok) throw new Error("Error to generate audio.");

                                const blob = await response.blob();
                                const audioUrl = URL.createObjectURL(blob);

                                // Update state with the new audio
                                setAudioUrls((prev) => ({
                                  ...prev,
                                  [message.id]: audioUrl,
                                }));
                                setLastAudioId(message.id);

                                // Play the generated audio
                                const audio = new Audio(audioUrl);
                                audio.play();
                              } catch (err) {
                                console.error("Error to generate audio: ", err.message);
                              }
                            }}
                          >
                            <AudioLines className="w-5 h-5 cursor-pointer" />
                          </button>
                        </li>

                        {/* PDF generation button */}
                        <li> <PdfGenerator content={[{ title: "Message Generated", text: message.text }]} /> </li>

                        {/* Edit message button (not implemented yet) */}
                        <li>
                          <button
                            type="button"
                            className="icon-circle"
                          >
                            {/* <Pen className="w-5 h-5 cursor-pointer" /> */}
                            <FontAwesomeIcon icon={faShareNodes} className="w-5 h-5 cursor-pointer" />
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </RippleEffect>
              </div>
            );
          })
        )}

        {/* Skeleton loader while waiting for AI response */}
        {skeleton && (
          <div role="status" className="skeleton w-full animate-pulse bg-[#232428] p-4 rounded-lg">
            <div className="h-2.5 bg-[#33353D] rounded-full w-full mb-3"></div>
            <div className="h-2 bg-[#33353D] rounded-full w-full mb-3"></div>
            <div className="h-2 bg-[#33353D] rounded-full w-full mb-3"></div>
          </div>
        )}

        {/* Invisible anchor to enable automatic scroll */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatMessages;

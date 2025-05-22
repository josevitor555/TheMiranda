// Import SyntaxHighlighter with Prism theme for syntax highlighting
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

// Choose the color theme: "coldarkDark" (dark, stylish, terminal-like)
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Icons for copy and bookmark functionality
import { Copy, FileCheck, Bookmark } from "lucide-react";
import { useState } from 'react';

// Custom renderer for highlighting code in markdown or rich text components
const highlightRenderers = {
  code({ inline, className, children, ...props }) {
    // Regex to detect the language being used (e.g., language-js)
    const match = /language-(\w+)/.exec(className || '');

    // Extract the raw code text (removes trailing newline)
    const codeText = String(children).replace(/\n$/, '');

    // Hook to control the "copied" state for the copy button
    const [copied, setCopied] = useState(false);

    // Function to copy the code to the clipboard
    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(codeText);
        setCopied(true); // Visual feedback: copied!
        setTimeout(() => setCopied(false), 2000); // Reset status after 2 seconds
      } catch (err) {
        console.error(`Error copying code: ${err}`);
      }
    };

    // If it's a block (not inline) and a language is defined:
    return !inline && match ? (
      <div
        style={{
          borderRadius: "12px",
          background: "#33353D",
          overflow: "hidden",
          marginBottom: "1rem",
        }}
      >
        {/* Block header: shows the language and buttons for copy and bookmark */}
        <div
          style={{
            background: "#33353D",
            border: "2px solid #40434b",
            borderRadius: "12px",
            color: "#eee",
            marginTop: "8px",
            fontSize: "0.875rem",
            padding: "12px 12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Language name (e.g., javascript, python, etc.) */}
          <span style={{ textTransform: "capitalize", fontSize: "16px" }}>
            {match[1]}
          </span>

          {/* Buttons for copy and bookmark */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <button
              onClick={handleCopy}
              style={{
                background: "transparent",
                border: "none",
                color: "#ccc",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {/* Icon changes based on whether the code was copied */}
              {copied ? <FileCheck /> : <Copy />}
              {copied ? "Copied!" : "Copy this code"}
            </button>

            <button
              style={{
                background: "transparent",
                border: "none",
                color: "#ccc",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Bookmark />
            </button>
          </div>
        </div>

        {/* The code block itself with syntax highlighting */}
        <SyntaxHighlighter
          style={coldarkDark} // Color theme
          language={match[1]} // Detected language
          PreTag="div" // Container used
          showLineNumbers // Show line numbers (like an editor)
          customStyle={{
            background: "transparent",
            fontSize: "1rem",
            padding: "18px 20px",
            overflowX: "auto",
          }}
          {...props}
        >
          {codeText}
        </SyntaxHighlighter>
      </div>
    ) : (
      // If inline or no language is defined, render as a simple <code> block
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

export default highlightRenderers;
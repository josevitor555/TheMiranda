// Simple welcome component
const ChatWelcome = () => {
  return (
    <div className="welcome-container flex flex-col items-center justify-center h-full text-center px-6">

      {/* Visual/decorative circle, with animated CSS */}
      <div className="circle-welcome"></div>

      {/* Assistant name */}
      <h1 className="text-4xl text-white font-bold mb-3"> MirandaAI </h1>
      
      {/* Friendly message */}
      <h2 className="text-3xl font-light text-white mb-2 max-w-md text-balance"> Hello! How can I help you today? </h2>
      
      {/* Charismatic footer */}
      <p className="text-gray-400 text-lg">
        Created by a Brazilian dev with coffee & ambition ☕🇧🇷
      </p>
    </div>
  )
}

export default ChatWelcome;

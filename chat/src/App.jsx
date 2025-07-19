

// Login Component
import Login from './components/Login';

// React Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Main chat app
import MainChatApp from './pages/MainChatApp';

// Main application component
const App = () => {
  return (

    <BrowserRouter>
      <Routes>

        {/* Main route */}
        <Route path='/' element={<Login />} />

        {/* Route for home */}
        <Route path='/home' element={<MainChatApp />} />

        {/* Route not found */}
        <Route path="*" element={<div> 404 - Page Not Found </div>} />

      </Routes>
    </BrowserRouter>

  );
}

export default App;

import React from 'react';

// Import Left Col Component
import LeftCol from '../components/LeftCol';

// Import Right Col Component
import RightCol from '../components/RightCol';

// Main component
const LoginPage = () => {
  return (
    <div className='grid grid-cols-2 min-h-screen w-screen'>
      
      <div className="flex-1 flex items-center justify-center">
        {/* Left Col */}
        <LeftCol />
      </div>

     <div className="flex-1 flex items-center justify-center">
        {/* Right Col */}
        <RightCol />
     </div>

    </div>
  );
}

export default LoginPage;

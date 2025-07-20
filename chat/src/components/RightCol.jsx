import React from 'react';

import userAvatar from '../../images/Miranda.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faShare, faBookmark } from '@fortawesome/free-solid-svg-icons';

// Import brand
import brand from "../../images/brand.png";

const RightCol = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-screen bg-gradient-to-br from-[#27282D] to-[#232428] gap-12'>

      <div className="container-post__social-media">

        {/* Container Post Social Media like Instagram */}
        <div className="container-post w-full max-w-md p-4 bg-[#33353D] rounded-lg border border-[#40434b]">

          {/* Header Post */}
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center justify-center">
                <img src={userAvatar} alt="User" className="w-16 h-auto rounded-full" />
              </div>

              <div className="user-info__name">
                <h3 className="text-lg font-semibold text-[#fafafa]"> Miranda </h3>
                <p className="text-sm text-gray-400"> @MirandaAI  - <span className="font-bold text-[#FFF2D7]"> 10,000 views </span></p>
              </div>

            </div>

            {/* Dots Menu */}
            <div className="flex items-center justify-center gap-2 cursor-pointer">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
            </div>
          </div>

          {/* Image Post */}
          <div className="mt-4 image-post">
            <img src={brand} alt="Post" className="w-full h-auto rounded-lg" />
          </div>

          {/* Footer Post */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center justify-center gap-6">
              <FontAwesomeIcon icon={faHeart} className="w-4 h-4 cursor-pointer text-gray-400 hover:text-[#FFF2D7] transition-colors" />
              <FontAwesomeIcon icon={faComment} className="w-4 h-4 cursor-pointer text-gray-400 hover:text-[#FFF2D7] transition-colors" />
              <FontAwesomeIcon icon={faShare} className="w-4 h-4 cursor-pointer text-gray-400 hover:text-[#FFF2D7] transition-colors" />
            </div>

            {/* Save Post */}
            <div className="flex items-center justify-center gap-2">
              <FontAwesomeIcon icon={faBookmark} className="w-4 h-4 cursor-pointer text-gray-400 hover:text-[#FFF2D7] transition-colors" />
            </div>
          </div>

          {/* Description Post */}
          <div className="mt-4 description-post">
            <div className="text-sm text-gray-300">
              <span className="font-bold text-[#FFF2D7]"> @MirandaAI </span>, Today's post will be about MCP Server, or for those more in the know, Model Context Protocol. A context protocol created by Anthropic, the one from Claude. #MCP #AI
            </div>
          </div>

          {/* Comment section */}
          <div className="mt-2 mb-2 flex gap-2">
            <p className='text-sm font-semibold text-[#FFF2D7]'> @josevitor555 </p>
            <span className='text-sm font-light text-gray-300'> Very good topic, I loved it. :D </span>
          </div>
        </div>
      </div>

    </div>
  );
}

export default RightCol;

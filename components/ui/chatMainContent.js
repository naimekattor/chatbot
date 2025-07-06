import Image from 'next/image'
import React from 'react'
import { RiLinkM } from 'react-icons/ri'

const ChatMainContent = () => {
  return (
    <div>
      <div className="flex-1 flex flex-col bg-gray-900">
      
        
            {/* Header  */}
            <div className="flex justify-between items-center p-6 border-b border-gray-700">
              <h1 className="text-2xl font-bold text-gray-100">How can we assist you today?</h1>
              <button className="text-gray-400 hover:text-white focus:outline-none">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </button>
            </div>
            {/* Chat Content Area  */}
            <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
              <div className="text-center max-w-lg">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Image src="/img/logo.png" width={196} height={63} alt="AdFusion Labs Logo" className="h-[63px] w-[196px] rounded-full" />
                </div>
                <h2 className="text-4xl font-bold mb-4">Ask me anything. I&apos;ll do my best to help.</h2>
                <p className="text-gray-400 mb-8">
                  Get expert guidance powered by AI agents specializing in Sales, Marketing, and Negotiation. While I provide data-driven insights and strategic recommendations, remember that I'm just a robot! Always verify information and make informed decisions before implementing any advice.
                </p>

                {/* Upload Image Section */}
                <div
                  className="border-2 border-dashed border-gray-600 rounded-lg p-6 cursor-pointer hover:border-blue-500 hover:bg-gray-800 transition-colors duration-200"
                  
                >
                  <p className="text-blue-500 font-semibold mb-2">Upload Image</p>
                  <p className="text-gray-400 text-sm">Detailed explanation of your Image.</p>
                </div>
              </div>
            </div>
          
        
        
      </div>
    </div>
  )
}

export default ChatMainContent

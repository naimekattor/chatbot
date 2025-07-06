'use client'

import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { LuMessageSquare } from 'react-icons/lu';
import { RiLinkM } from 'react-icons/ri';

// Main App component for the Chatbot Interface
const Chat = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const[messageHistory,setMessageHistory]=useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token=localStorage.getItem('token');
  

  useEffect(()=>{
    localStorage.setItem('messageHistory',JSON.stringify(messageHistory));
  },[messageHistory])

//   fetch message history from localstorage
useEffect(()=>{
    const saved=localStorage.getItem('messageHistory');
    if(saved){
        setMessageHistory(JSON.parse(saved))
    }
},[])
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim()) {
        //handle sending message
        axios.post('https://backend.gameplanai.co.uk/chat_app/create_chat/',{
            "text_content":messageInput
        },{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            }
        })
        .then(res=>{
            setMessageHistory(prevHistory=>[
                ...prevHistory,{message:res.data.chat_contents}
            ])
            localStorage

            setMessageInput('');
            setIsLoading(false);
            console.log('bot response',res.data);
            console.log('message history',messageHistory);
            
            
        }).catch(err=>{
            console.log('error',err.response.data.Message);
            
        })
      console.log('Sending message:', messageInput);
      setMessageInput('');
      // In a real app, you'd send this to a backend or process it here
    }
  };

  const handleImageUpload = () => {
    console.log('Image upload initiated');
    // In a real app, open file picker or camera
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-900 text-white font-sans">
      {/* Left Sidebar */}
      <div className="w-full lg:w-80 bg-gray-800 p-4 flex flex-col border-r border-gray-700">
        {/* Logo */}
        <div className="flex items-center space-x-2 mb-6">
          <Image src="/img/logo.png" width={196} height={63} alt="AdFusion Labs Logo" className="h-[63px] w-[196px] rounded-full" />
          
        </div>

        {/* Search Input */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-3 pl-10 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>

        {/* Recent Chats */}
        <div className="mb-6 flex-grow overflow-y-auto custom-scrollbar">
          <h3 className="text-gray-400 text-sm font-semibold uppercase mb-3">Recent Chats</h3>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-md hover:bg-gray-600 cursor-pointer transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8  flex items-center justify-center text-sm font-bold">
                    <LuMessageSquare />

                  </div>
                  <span className="text-gray-200 text-sm">How can I increase the ...</span>
                </div>
                <button className="text-gray-400 hover:text-white focus:outline-none">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Update Your Plan Card */}
        <div className="bg-blue-600 p-4 rounded-lg text-center mb-6">
          <h4 className="text-lg font-bold mb-2">Update Your Plan</h4>
          <p className="text-sm text-blue-100 mb-4">Unlock powerful features with our pro upgrade today!</p>
          <button className="w-full bg-white text-blue-600 font-bold py-2 rounded-md hover:bg-gray-100 transition duration-300">
            Update
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-md mt-auto">
          <img src="https://placehold.co/40x40/50C878/FFFFFF?text=FI" alt="User Avatar" className="h-10 w-10 rounded-full" />
          <span className="text-gray-200 font-medium">Farhan Israk</span>
          <button className="ml-auto text-gray-400 hover:text-white focus:outline-none">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      
      <div className="flex-1 flex flex-col bg-gray-900">

        {
            messageHistory.length>0?
            /* Chat Messages */
        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
          <div className="space-y-4">
            {messageHistory.flatMap(item => item.message).map((msg, index) => (
                <div
    key={index}
    className={`w-full flex ${msg.sent_by === 'User' ? 'justify-end' : 'justify-start'}`}
  >
    <div className="bg-gray-800 inline-block gap-2 p-4 rounded-lg max-w-[70%]">
      <p className="text-gray-200 whitespace-pre-wrap">{msg.text_content}</p>
    </div>
  </div>
            ))}
            {
            isLoading && (
              <div className="mx-auto w-full max-w-sm rounded-md border border-blue-300 p-4">
                <div className="flex animate-pulse space-x-4">
                  <div className="size-10 rounded-full bg-amber-300"></div>
                  <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 rounded bg-amber-300"></div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2 h-2 rounded bg-amber-300"></div>
                        <div className="col-span-1 h-2 rounded bg-amber-300"></div>
                      </div>
                      <div className="h-2 rounded bg-amber-300"></div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
          </div>
          </div>
          :
          <>
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
              onClick={handleImageUpload}
            >
              <p className="text-blue-500 font-semibold mb-2">Upload Image</p>
              <p className="text-gray-400 text-sm">Detailed explanation of your Image.</p>
            </div>
          </div>
        </div>
        </>

        }
        

        

        

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="p-6 border-t border-gray-700 flex items-center space-x-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Type your prompt here"
              className="w-full p-3 pr-12 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none">
              <RiLinkM className='size-6'/>

            </button>
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;

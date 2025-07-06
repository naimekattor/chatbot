'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, {  useEffect, useState } from 'react'
import { LuMessageSquare } from 'react-icons/lu'
//import { authContext } from '../../context/AuthContext'
import { IoIosLogOut } from 'react-icons/io'

const ChatSideBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [messageHistory, setMessageHistory] = useState([]);
    const [userProfile, setUserProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    //const {user}=useContext(authContext);
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    useEffect(()=>{
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('https://backend.gameplanai.co.uk/chat_app/get_all_chat_list_of_user/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setMessageHistory(Array.isArray(data) ? data : []);
                //console.log('chat list', data.data.chat_contents);
            } catch (err) {
                console.error('Error fetching chat list:', err);
            }
            setIsLoading(false);
        };
        fetchData();
    },[])
    useEffect(()=>{
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('https://backend.gameplanai.co.uk/authentication_app/user_profile/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setUserProfile(data);
                console.log('User Profile:', data);
                
            } catch (err) {
                console.error('Error fetching chat list:', err);
            }
            setIsLoading(false);
        };
        fetchData();
    },[])


    const handleLogout=()=>{
      localStorage.removeItem('token');
      window.location.href='/login';
    }
  return (
    <div className='min-h-screen bg-gray-800'>
      {/* Left Sidebar */}
            <div className="w-full h-screen lg:w-80  p-4 flex flex-col justify-between border-r border-gray-700">
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
              {
                isLoading ? <>Loading....</>:
                <div className="mb-6 flex-grow overflow-y-auto custom-scrollbar">
                <h3 className="text-gray-400 text-sm font-semibold uppercase mb-3">Recent Chats</h3>
                <div className="space-y-3">
                  {messageHistory.map((chat, index) => (
                    <div key={chat.id ||index} className="flex items-center justify-between p-3 bg-gray-700 rounded-md hover:bg-gray-600 cursor-pointer transition-colors duration-200">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8  flex items-center justify-center text-sm font-bold">
                          <LuMessageSquare />
      
                        </div>
                        <Link href={`/chat/${chat.id}`}>
                        <span className="text-gray-200 text-sm">{chat.chat_name || 'untitled chat'}</span>
                        </Link>
                        
                      </div>
                      <button className="text-gray-400 hover:text-white focus:outline-none">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              }
              
      
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
                <span className="text-gray-200 font-medium">{userProfile?.name}</span>
                <button className="ml-auto text-gray-400 hover:text-white focus:outline-none cursor-pointer" onClick={handleLogout}>
                  <IoIosLogOut />

                </button>
              </div>
            </div>
    </div>
  )
}

export default ChatSideBar

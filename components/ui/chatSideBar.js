'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, {  useEffect, useState } from 'react'
import { LuMessageSquare } from 'react-icons/lu'
//import { authContext } from '../../context/AuthContext'
import { IoIosLogOut } from 'react-icons/io'
import { BiSolidMessageAdd } from 'react-icons/bi'
import { useRouter } from 'next/navigation'
import { MdDelete, MdOutlineDriveFileRenameOutline } from 'react-icons/md'
import axios from 'axios'
import { RxCross2 } from 'react-icons/rx'
import { GoSidebarExpand } from 'react-icons/go'

const ChatSideBar = ({setShowSidebar}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [messageHistory, setMessageHistory] = useState([]);
    const [userProfile, setUserProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const[filteredData,setFilteredData]=useState([])
    const[activeMenu,setActiveMenu]=useState(null);
    const [editingChatId,setEditingChatId]=useState(null);
    const[editingTitle,setEditingTitle]=useState('');
    console.log(searchTerm);
    
    //const {user}=useContext(authContext);
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const router=useRouter();

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


// handle search
const handleSearch=(input)=>{
       setSearchTerm(input.toLowerCase());

       const filteredItems=messageHistory.filter((mess)=>mess.chat_name.toLowerCase().includes(input));
       setFilteredData(filteredItems)
       console.log(filteredItems);
       
       console.log(input);
       
}

//  handle chat title edit
const handleEditChatTitle=async(chatId)=>{
  console.log(chatId);
  if(!editingTitle.trim()){
    editingChatId(null);
    return
  }

  try{
    setIsLoading(true);

   await axios.post(`https://backend.gameplanai.co.uk/chat_app/update_chat_title/${chatId}/`,{
   "chat_title": editingTitle
},{
  headers:{
    'Authorization':`Bearer ${token}`
  }
})

setMessageHistory(prev=>prev.map(chat=>chat.id===chatId?{...chat,chat_name:editingTitle}:chat))

  }catch(err){
    console.log(err);
    
  }


  setIsLoading(false);
  setEditingChatId(null)

}


  return (
    <div className="min-h-screen bg-gray-800">
      {/* Left Sidebar */}
      <div className="w-full h-screen lg:w-80  p-4 flex flex-col justify-between border-r border-gray-700">
        {/* Logo */}
        <div className="flex items-center justify-between space-x-2 mb-6">
          <Image
            src="/img/logo.png"
            width={196}
            height={63}
            alt="AdFusion Labs Logo"
            className="h-[63px] w-[196px] rounded-full"
          />
          <span onClick={()=>setShowSidebar(prev=>!prev)} className='md:hidden block'><GoSidebarExpand />

</span>
        </div>

        <div className="flex justify-end py-2">
          <button
            className="cursor-pointer"
            onClick={() => router.push("/chat")}
          >
            <BiSolidMessageAdd className="size-6" />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-3 pl-10 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>

        {filteredData && filteredData.length > 0 && (
          <div className="mb-6 flex-grow overflow-y-auto custom-scrollbar">
            <h3 className="text-gray-400 text-sm font-semibold uppercase mb-3">
              Search Results
            </h3>
            <div className="space-y-3">
              {filteredData.map((chat, index) => (
                <div
                  key={chat.id || index}
                  className="flex items-center justify-between p-3 bg-gray-700 rounded-md hover:bg-gray-600 cursor-pointer transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8  flex items-center justify-center text-sm font-bold">
                      <LuMessageSquare />
                    </div>
                    <Link href={`/chat/${chat.id}`}>
                      <span className="text-gray-200 text-sm">
                        {chat.chat_name || "untitled chat"}
                      </span>
                    </Link>
                  </div>
                  <button className="text-gray-400 hover:text-white focus:outline-none">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                      ></path>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Chats */}
        {isLoading ? (
          <>Loading....</>
        ) : (
          <div className="mb-6 flex-grow overflow-y-auto custom-scrollbar">
            <h3 className="text-gray-400 text-sm font-semibold uppercase mb-3">
              Recent Chats
            </h3>
            <div className="space-y-3">
              {messageHistory.map((chat, index) => (
                <div
                  key={chat.id || index}
                  className="flex items-center justify-between p-3 bg-gray-700 rounded-md hover:bg-gray-600 cursor-pointer transition-colors duration-200 relative"
                >
                  <div className="flex items-center space-x-3 ">
                    <div className="h-8 w-8  flex items-center justify-center text-sm font-bold">
                      <LuMessageSquare />
                    </div>

                    {
                      editingChatId===chat.id?
                      <input 
                         type='text' 
                         className='bg-gray-800 text-gray-200 py-2 px-1 rounded-md'
                         onChange={(e)=>setEditingTitle(e.target.value)}
                         onKeyDown={e=>{
                          if(e.key==='Enter')handleEditChatTitle(chat.id)
                            if(e.key==='Escape')setEditingChatId(null)
                         }}
                         />:
                      <Link href={`/chat/${chat.id}`}>
                      <span id='chatName' className="text-gray-200 text-sm">
                        {chat.chat_name || "untitled chat"}
                      </span>
                    </Link>
                    }
                    
                  </div>
                  <button
                    className="text-gray-400 hover:text-white focus:outline-none"
                    onClick={() =>
                      setActiveMenu(activeMenu === chat.id ? null : chat.id)
                    }
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                      ></path>
                    </svg>
                  </button>
                  {activeMenu && activeMenu === chat.id && (
                    <div className="absolute right-0 top-12 bg-gray-400 rounded shadow-lg z-10">
                      <button className="flex items-center px-4 py-2 hover:bg-gray-300 hover:text-black w-full" onClick={()=>{
                        setEditingChatId(chat.id);
                        setEditingTitle(chat.chat_name||'');
                        setActiveMenu(null);
                      }}>
                        <MdOutlineDriveFileRenameOutline className="mr-2" />{" "}
                        Rename
                      </button>
                      <button className="flex items-center px-4 py-2 text-red-500  w-full">
                        <MdDelete className="mr-2" /> Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Update Your Plan Card */}
        <div className="bg-blue-600 p-4 rounded-lg text-center mb-6">
          <h4 className="text-lg font-bold mb-2">Update Your Plan</h4>
          <p className="text-sm text-blue-100 mb-4">
            Unlock powerful features with our pro upgrade today!
          </p>
          <button className="w-full bg-white text-blue-600 font-bold py-2 rounded-md hover:bg-gray-100 transition duration-300">
            Update
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-md mt-auto">
          <img
            src="https://placehold.co/40x40/50C878/FFFFFF?text=FI"
            alt="User Avatar"
            className="h-10 w-10 rounded-full"
          />
          <span className="text-gray-200 font-medium">{userProfile?.name}</span>
          <button
            className="ml-auto text-gray-400 hover:text-white focus:outline-none cursor-pointer"
            onClick={handleLogout}
          >
            <IoIosLogOut />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatSideBar

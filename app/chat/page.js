'use client'

import React from 'react';
import  { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import SendMessage from '../../components/ui/sendMessage';
import ChatMainContent from '../../components/ui/chatMainContent';

// Main App component for the Chatbot Interface
const Chat = () => {

    const [messageInput, setMessageInput] = useState('');
  const[messageHistory,setMessageHistory]=useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentChatId,setCurrentChatId]=useState(null);
  const [token,setToken]=useState(null);
  const [error,setError]=useState(null);
  
  const router=useRouter();
  const params=useParams();
  const chatId=params?.chatId;

  useEffect(()=>{
    localStorage.setItem('messageHistory',JSON.stringify(messageHistory));
  },[messageHistory])

//   fetch message history from localstorage
useEffect(()=>{
    const saved=localStorage.getItem('messageHistory');
    if(saved){
        setMessageHistory(JSON.parse(saved))
    }
    setToken(localStorage.getItem('token'))
},[])
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim()) {
        //handle sending message
        const url=currentChatId?`https://backend.gameplanai.co.uk/chat_app/add_message_to_chat/${chatId}`
        :`https://backend.gameplanai.co.uk/chat_app/create_chat/`;
        setIsLoading(true);
        axios.post(url,{
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
            if (!currentChatId && res.data.id) {
                setCurrentChatId(res.data.id);
                router.push(`/chat/${res.data.id}`);
            }
            
            console.log(res.data.id);
            

            setMessageInput('');
            setIsLoading(false);
            console.log('bot response',res.data);
            console.log('message history',messageHistory);
            
            
        }).catch(err => {
  if (err.response && err.response.data) {
    setError(err.response.data.Message);
    console.log('error', err.response.data.Message);
  } else {
    console.log('error', err.message);
  }
  setIsLoading(false);
});
      console.log('Sending message:', messageInput);
      setMessageInput('');
      // In a real app, you'd send this to a backend or process it here
    }
  };
  
  

  return (
  
  <div className='flex flex-col h-full min-h-screen bg-gray-900 justify-between'>
    <div className="flex-1 p-6 overflow-y-auto">
        {messageHistory.length > 0 ? (
          <div className="space-y-4">
            {messageHistory.map((msg, index) => (
              <div
                key={index}
                className={`w-full flex ${msg.sent_by === 'User' ? 'justify-end' : 'justify-start'}`}
              >
                <div className="bg-gray-800 inline-block gap-2 p-4 rounded-lg max-w-[70%]">
                  {
                    isLoading? <p>Loading</p>:<p className="text-gray-200 whitespace-pre-wrap">{msg.text_content}</p>
                  }
                  
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ChatMainContent error={error}/>
        )}
      </div>
      <div>
          <SendMessage handleSendMessage={handleSendMessage} setMessageInput={setMessageInput} messageInput={messageInput}/>

      </div>
  </div>
  );
};

export default Chat;

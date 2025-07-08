'use client'
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import SendMessage from '../../../components/ui/sendMessage';

const ChatPage = () => {
    const [messageHistory, setMessageHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [messageInput, setMessageInput] = useState('');

    
    const { chatId } = useParams();
    console.log(chatId);
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`https://backend.gameplanai.co.uk/chat_app/get_chat_contents/${chatId}/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setMessageHistory(response.data.chat_contents);
                console.log('chat data', response.data);
                console.log(messageHistory);
                
            }
            catch (err) {
                console.log(err);
                console.log('Error fetching chat data');
            }
            setIsLoading(false);
        }
        fetchData();
    }, [chatId, token])


    useEffect(()=>{
      console.log('printed');
      
    },[])


    const handleSendMessage = async (e) => {
       e.preventDefault();
        console.log('handleSendMessage called');
        console.log('messageInput:', messageInput);
        console.log('chatId:', chatId);
        console.log('token:', token);
        
        if (!messageInput.trim()) {
            console.log('Message input is empty, returning');
            return;
        }
        
        const userMessage = messageInput.trim();
        setMessageInput(''); // Clear input immediately
        setIsLoading(true);
        
        console.log('About to send message:', userMessage);
        
        // Add user message to history immediately
        setMessageHistory(prev => [...prev, {
            text_content: userMessage,
            sent_by: 'User'
        }]);
        
        try {
            console.log('Making API call...');
            const response = await axios.post(
                `https://backend.gameplanai.co.uk/chat_app/add_message_to_chat/${chatId}/`,
                {
                    "text_content": userMessage
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            console.log('Message sent successfully:', response.data);
            console.log('Full response:', response);
            
            // Instead of trying to add the response immediately, 
            // let's refresh the chat contents to get the updated messages
            console.log('Refreshing chat contents after sending message...');
            
            // Fetch updated chat contents
            const updatedChatResponse = await axios.get(
                `https://backend.gameplanai.co.uk/chat_app/get_chat_contents/${chatId}/`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            
            console.log('Updated chat contents:', updatedChatResponse.data);
            setMessageHistory(updatedChatResponse.data.chat_contents);
            
        } catch (err) {
            console.error('Error sending message:', err);
            console.error('Error response:', err.response);
            console.error('Error status:', err.response?.status);
            console.error('Error data:', err.response?.data);
            
            // Optionally add an error message to the chat
            setMessageHistory(prev => [...prev, {
                text_content: err.response?.data.Message,
                sent_by: 'Bot'
            }]);
        }
        
        setIsLoading(false);
        console.log('handleSendMessage completed');
    }

  return (
    <div className='flex flex-col h-screen w-full bg-gray-800 text-white justify-between'>
      {/* chat for chatId: {chatId} */}
      {/* Main Chat Area */}
      
       <div className="flex-1 flex flex-col bg-gray-900 overflow-y-auto">

         {
            messageHistory.length>0 ?
            /* Chat Messages */
        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
          <div className="space-y-4">
            {messageHistory.map((msg, index) => (
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
                  <div className="size-10 rounded-full bg-gray-800"></div>
                  <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 rounded bg-gray-800"></div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2 h-2 rounded bg-gray-800"></div>
                        <div className="col-span-1 h-2 rounded bg-gray-800"></div>
                      </div>
                      <div className="h-2 rounded bg-gray-800"></div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
          </div>
          </div>
          :
          <><p>No messages found.</p></>
        }
       </div>

       <div className='fixed inset-x-0 z-50 bottom-0 bg-[#111826]'>
        <SendMessage handleSendMessage={handleSendMessage} setMessageInput={setMessageInput} messageInput={messageInput}/>
       </div>
    </div>
  )
}

export default ChatPage

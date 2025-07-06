import React from 'react'
import { RiLinkM } from 'react-icons/ri'

const SendMessage = ({ messageInput, setMessageInput, handleSendMessage }) => {
  return (
    <div>
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
  )
}

export default SendMessage

import ChatSideBar from "../../components/ui/chatSideBar";


export default function ChatLayout({ children }) {
  

  return (
    <div className='flex'>
      <div className=' bg-gray-800 p-4'>
        <ChatSideBar />
      </div>
      <div className='w-full p-4 flex flex-col h-screen justify-between'>
        {children}
        {/* Message Input */}
        
      </div>
      
    </div>
  )
}
'use client'
import { FaBarsStaggered } from "react-icons/fa6";
import ChatSideBar from "../../components/ui/chatSideBar";
import { useState } from "react";
import Image from "next/image";
import { LuMessageSquarePlus } from "react-icons/lu";
import { useRouter } from "next/navigation";


export default function ChatLayout({ children }) {

  const [showSideBar,setShowSidebar]=useState(false);
  const router=useRouter();

  return (
    <div className='flex md:flex-row flex-col'>
      <div className=' bg-gray-800 p-4 md:block hidden'>
        <ChatSideBar />
      </div>
      <div className="bg-black w-full py-8 h-6 md:hidden flex justify-between px-4 items-center">

        <span onClick={()=>setShowSidebar(prev=>!prev)}><FaBarsStaggered />
</span>
        <h1>
          <Image src={'/img/logo.png'} width={60} height={60} alt="logo" className="w-[100px] h-[60px]"/>
        </h1>
        <button onClick={()=>router.push('/chat')}><LuMessageSquarePlus />
</button>
      </div>
      <div className={`w-76 bg-[#f7f1eb] h-screen fixed z-10  ${showSideBar ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300`}>
      {
        showSideBar && 
        <div>
          <ChatSideBar setShowSidebar={setShowSidebar}/>
        </div>
        
      }
      </div>
      <div className='w-full p-4 flex flex-col md:h-screen h-[calc(100vh-400px)] justify-between'>
        {children}
       
        
      </div>
      
    </div>
  )
}
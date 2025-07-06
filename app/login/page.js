'use client'

import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { TfiEmail, TfiLock,  } from 'react-icons/tfi';
import { authContext } from '../../context/AuthContext';
// Main App component
const Login = () => {
  const [email, setEmail] = useState('');
  
  const [password, setPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);

  const {setUser}=useContext(authContext);
const router=useRouter();  
const userInfo={email,password}
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission 
    axios.post('https://backend.gameplanai.co.uk/authentication_app/login/', userInfo)
    .then(res=>{
        if (res.data.user_profile) {
          setUser()

            localStorage.setItem('token',res.data.access)
            router.push('/chat')
            
        }
        console.log(res.data);
        
    }).catch(err=>{
        console.log('error',err);
        
    })
    console.log(userInfo);
    console.log({ email, password });
    alert('Form submitted! (Check console for data)'); // Using alert for demo, replace with proper UI feedback
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050214] p-4">
      <div className="flex flex-col lg:flex-row  rounded-lg shadow-lg overflow-hidden w-full max-w-4xl">
        {/* Left Section - Image and Logo */}
        <div className="relative w-full lg:w-1/2  flex items-center justify-center p-4">
          {/* Logo */}
          <div className="absolute top-4 left-4 flex items-center space-x-2">
            <Image src={'/img/logo.png'} width={195} height={66} alt="AdFusion Labs Logo" className="h-[66px] w-[196px] rounded-full" />
            
          </div>
          {/* Main Image */}
          <Image
            src="/img/login_img1.png"
            width={703}
            height={703} 
            alt="Login Image"
            className="w-full h-auto object-contain max-h-[400px] lg:max-h-full rounded-md"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x400/000000/FFFFFF?text=Image+Not+Found"; }}
          />
        </div>

        {/* Right Section - Sign Up Form */}
        <div className="w-full lg:w-1/2 p-8 bg-[#1F1F1F] rounded-[20px] text-white flex flex-col justify-center">
          <h2 className="text-[30px] font-[500] mb-2">Log in</h2>
          <p className=" text-[16px] font-[400]">
            If you already have an account register 
          </p>
          <span className='mb-6 text-[16px] font-[400]'>You can <Link href="signup" className="text-blue-500 hover:underline">Register here !</Link></span>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <div className="flex items-center gap-x-2 relative border-b-1">
                <span className="flex items-center pl-3">
                  <TfiEmail className="" />
                </span>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3  focus:outline-none  "
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

          

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <div className="flex items-center gap-x-2 relative border-b-1">
                <span className="flex items-center pl-3">
                  <TfiLock className="" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="w-full p-3  focus:outline-none"
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none"
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-2.06M12 10a2 2 0 100-4 2 2 0 000 4z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.25 18.825A10.05 10.05 0 0021 12c-1.275-4.057-5.065-7-9.543-7a9.97 9.97 0 00-1.563 2.06"></path></svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                  )}
                </button>
              </div>
            </div>

            

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full cursor-pointer  transition duration-300 ease-in-out transform hover:scale-105"
            >
              Login
            </button>
          </form>
          <div className='text-[16px] font-[500] py-3 text-center'>
            <p>Or continue with </p>
            <div className='flex items-center justify-center gap-4 py-4'>
                                <Link href="#" className="text-blue-500 hover:underline"><Image src={'/img/apple.png' } width={40} height={40} alt='apple logo'/></Link>
                <Link href="#" className="text-blue-500 hover:underline"><Image src={'/img/search.png' } width={40} height={40} alt='google logo'/></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

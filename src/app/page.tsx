'use client'

import WelcomePageCard from "@/components/WelcomePageCard";
import React from "react";


function page() {
 
 
  return (
  <div>
    <div className="flex flex-col items-center">
    <h1 className="text-green-900 sm:text-3xl lg:text-5xl max-sm:text-4xl max-sm:leading-none text-center mt-6 w-[70%] max-sm:w-full mx-auto ">Welcome To Finance Free</h1>
    <p className="text-center text-green-600 sm:text-2xl lg:text-4xl max-sm:text-2xl max-sm:w-[90%] mt-4 w-[70%] mx-auto">Here you can mange your finances and improve your finance mangement skill</p>

    </div>
    <div className="w-full h-full flex items-center justify-center">
    
      <WelcomePageCard/>
    </div>
  </div>
  );
}
export default page;

'use client'
import InfiteScroll from "@/components/InfiteScroll";
import React, { useEffect, useState } from "react";


function page() {
  

 
  return (
  <div>
    <h1 className="text-blue-600 lg:text-6xl max-sm:text-2xl max-sm:leading-none text-center mt-6 w-[70%] max-sm:w-full mx-auto ">Welcome To Finance Free</h1>
    <p className="text-center text-blue-400 lg:text-3xl max-sm:text-lg max-sm:w-[90%] mt-4 w-[70%] mx-auto">Here you can mange your finances and improve your finance mangement skill</p>

    <div className="w-full h-full">
      <InfiteScroll/>
    </div>
  </div>
  );
}
export default page;

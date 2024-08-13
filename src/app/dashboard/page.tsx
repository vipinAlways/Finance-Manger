"use client";
import BarGraph from "@/components/BarGraph";
// import PieGraph from "@/components/pieGraph";

import React, { useEffect } from "react";

function page() {


  useEffect(() => {
    const postUser = async () => {
      try {
        let response = await fetch("http://localhost:3000/api/post-user", {
          method: "POST",
        });
        response = await response.json();
        console.log(response);
        if (response.ok) {
          console.log("Transaction added successfully");
        } else {
          console.error("Failed to add transaction:", response);
        }
      } catch (error) {
        console.error("Error while adding transaction:", error);
      }
    };

    postUser();
  }, []);

  return (
    <div>
     <div className="w-[120vh] mt-2">
      <h1 className="text-center w-full mb-1 text-lg">Your transaction graph</h1>
      <BarGraph />
     </div>
     <div>
      {/* <PieGraph/> */}
     </div>
    </div>
  );
}

export default page;

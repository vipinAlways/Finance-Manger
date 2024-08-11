"use client";
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

  return <div>dashboard</div>;
}

export default page;

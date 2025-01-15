"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Suggestion() {
  const [budget, setBudget] = useState<[]>([]);
  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const response = await fetch("/api/get-amount");
        if (!response.ok) {
          console.error("Failed to fetch budget:", response.statusText);
          return;
        }
  
        const result = await response.json();
        if (result.ok && Array.isArray(result.amount)) {
          setBudget(result.amount);
        } else {
          console.error("Unexpected API response structure:", result);
        }
      } catch (error) {
        console.error("Error fetching budget:", error);
      }
    };
  
    fetchBudget();
  }, []);

  if (budget.length <= 0) {
    return (
      <Link
        href="/acounts"
        className="text-2xl text-red-500 animate-blink cursor-pointer w-fit h-10 z-[999]"
      >
        ! Looks like you have not set your budget
      </Link>
    );
  }
  return <div></div>;
}

export default Suggestion;

import Link from "next/link";
import React from "react";

function InfiteScroll() {
  return (
    <div className="wrapper h-full">
      <Link href='/dashboard' className="item item1 mx-3">
        <img src="./image1.jpg" alt="" className="w-[210px] h-[210px] object-contain border"/>
        <h1 className="text-center mt-2 max-sm:mt-px text-xl w-full text-green-400 px-1">You can monitor your journey with graphs.</h1>
      </Link >
      <Link href='/transaction' className="item item2 mx-3">
        {" "}
        <img src="./image5.jpg" alt="" className="w-[210px] h-[210px] object-contain border"/>
        <h1 className="text-center mt-2 max-sm:mt-px text-xl w-full text-green-400 px-1">You can add transactions for Spend, Earn, or Loan</h1>
      </Link>
      <Link href='/acounts' className="item item3 mx-3">
        {" "}
        <img src="./image3.jpg" alt="" className="w-[210px] h-[210px] object-contain border"/>
        <h1 className="text-center mt-2 max-sm:mt-px text-xl w-full text-green-400 px-1">Make your financial management easy. </h1>

      </Link>
      <Link href='/categories' className="item item4 mx-3">
        {" "}
        <img src="./image4.jpg" alt="" className="w-[210px] h-[210px] object-contain border"/>
        <h1 className="text-center mt-2 max-sm:mt-px text-xl w-full text-green-400 px-1">Let software handle your small tasks.</h1>

      </Link>
      <Link href='/dashboard' className="item item5 mx-3">
        <img src="./image1.jpg" alt="" className="w-[210px] h-[210px] object-contain border"/>
        <h1 className="text-center mt-2 max-sm:mt-px text-xl w-full text-green-400 px-1">You can monitor your journey with graphs.</h1>
      </Link >
      <Link href='/transaction' className="item item6 mx-3">
        {" "}
        <img src="./image5.jpg" alt="" className="w-[210px] h-[210px] object-contain border"/>
        <h1 className="text-center mt-2 max-sm:mt-px text-xl w-full text-green-400 px-1">You can add transactions for Spend, Earn, or Loan</h1>
      </Link>
      <Link href='/acounts' className="item item7 mx-3">
        {" "}
        <img src="./image3.jpg" alt="" className="w-[210px] h-[210px] object-contain border"/>
        <h1 className="text-center mt-2 max-sm:mt-px text-xl w-full text-green-400 px-1">Make your financial management easy. </h1>

      </Link>
      <Link href='/categories' className="item item8 mx-3">
        {" "}
        <img src="./image4.jpg" alt="" className="w-[210px] h-[210px] object-contain border"/>
        <h1 className="text-center mt-2 max-sm:mt-px text-xl w-full text-green-400 px-1">Let software handle your small tasks.</h1>

      </Link>
    
    </div>
  );
}

export default InfiteScroll;

import Image from "next/image";
import Link from "next/link";
import React from "react";

const cardData = [
  {
    url: "/dashboard",
    description: "You can monitor journey with graph.",
    imageUrl:'/image1.jpg'
  },
  {
    url: "/transation",
    description: " You can add transactions",
    imageUrl:'/image4.jpg'
  },
  {
    url: "/categories",
    description: "  Make your financial management easy.",
    imageUrl:'/image3.jpg'
  },
  {
    url: "/accounts",
    description: " Let software handle your small tasks.",
    imageUrl:'/image5.jpg'
  },
];

function WelcomePageCard() {
  return (
    <div className="w-full grid grid-cols-2 rounded-lg mt-4 gap-6 card-container">
  {cardData.map((item, index) => (
    <Link
      href={item.url}
      className="flex items-center border w-full rounded-xl h-40 p-1 transform transition-transform ease-in-out duration-300 card"
      key={index}
    >
     <div className="w-52 h-36">
     <Image
        src={item.imageUrl}
        alt="hello"
        className=" rounded-lg object-contain border-r-2"
        width={145}
        height={176}
      />
     </div>
      <h1 className="flex-grow text-xl text-center">
        {item.description}
      </h1>
    </Link>
  ))}
</div>

  
  );
}

export default WelcomePageCard;

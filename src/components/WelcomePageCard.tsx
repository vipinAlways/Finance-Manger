import Image from "next/image";
import Link from "next/link";
import React from "react";

const cardData = [
  {
    url: "/dashboard",
    description: "You can monitor journey with graph.",
    imageUrl: "/image1.jpg",
  },
  {
    url: "/transaction",
    description: " You can add transactions",
    imageUrl: "/image4.jpg",
  },
  {
    url: "/categories",
    description: "  Make your financial management easy.",
    imageUrl: "/image3.jpg",
  },
  {
    url: "/accounts",
    description: " Let software handle your small tasks.",
    imageUrl: "/image5.jpg",
  },
];

function WelcomePageCard() {
  return (
    <div className="w-full flex flex-wrap  justify-around rounded-lg mt-4 gap-6 lg:card-container ">
      {cardData.map((item, index) => (
        <Link
          href={item.url}
          className="flex items-center border max-lg:w-4/5 w-2/5 rounded-xl sm:h-40  h-72 p-1 lg:hover:scale-105 transition-all ease-in-out duration-300 card max-sm:flex-col"
          key={index}
        >
          <div className="w-full h-64 sm:h-36 sm:w-52 relative">
            <Image
              src={item.imageUrl}
              alt="hello"
              className="rounded-lg object-cover  object-center border-r-2"
              fill
            />
          </div>
          <h1 className="flex-grow text-2xl sm:text-xl text-center">{item.description}</h1>
        </Link>
      ))}
    </div>
  );
}

export default WelcomePageCard;

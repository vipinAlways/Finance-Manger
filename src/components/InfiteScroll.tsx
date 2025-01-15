import Image from "next/image";
import Link from "next/link";
import React from "react";

function InfiteScroll() {
  return (
    <div className="wrapper h-full flex flex-1">
      <Link href="/dashboard" className="item item1 mx-3">
       <div className="w-[210px] h-[210px]">
       <Image
          height={176}
          width={176}
          src="/image1.jpg"
          alt="hello "
          className=" object-contain border"
        />
       </div>
        <h1 className="text-center mt-2 max-sm:mt-px text-xl w-full text-green-400 px-1">
          You can monitor journey with graph.
        </h1>
      </Link>
      <Link href="/transaction" className="item item2 mx-3">
        {" "}
        <div className="w-[210px] h-[210px]">
        <Image
          height={176}
          width={176}
          src="/image5.jpg"
          alt="hello "
          className="object-contain border"
        />
      </div>
        <h1 className="text-center mt-2 max-sm:mt-px text-xl w-full text-green-400 px-1">
          You can add transactions{" "}
        </h1>
      </Link>
      <Link href="/acounts" className="item item3 mx-3">
        {" "}
       <div className="w-[210px] h-[210px] ">
       <Image
          height={176}
          width={176}
          src="/image3.jpg"
          alt="hello "
          className="object-contain border"
        />
       </div>
        <h1 className="text-center mt-2 max-sm:mt-px text-xl w-full text-green-400 px-1">
          Make your financial management easy.{" "}
        </h1>
      </Link>
      <Link href="/categories" className="item item4 mx-3">
        {" "}
        <div className="w-[210px] h-[210px]">
        <Image
          height={176}
          width={176}
          src="/image4.jpg"
          alt="hello "
          className=" object-contain border"
        />
        </div>
        <h1 className="text-center mt-2 max-sm:mt-px text-xl w-full text-green-400 px-1">
          Let software handle your small tasks.
        </h1>
      </Link>
      <Link href="/dashboard" className="item item5 mx-3">
       <div className="w-[210px] h-[210px] ">
       <Image
          height={176}
          width={176}
          src="/image1.jpg"
          alt="hello hello"
          className="object-contain border"
        />
       </div>
        <h1 className="text-center mt-2 max-sm:mt-px text-xl w-full text-green-400 px-1">
          You can monitor journey with graph.
        </h1>
      </Link>
      <Link href="/transaction" className="item item6 mx-3">
        {" "}
       <div className="w-[210px] h-[210px]">
       <Image
          height={176}
          width={176}
          src="/image5.jpg"
          alt="hello "
          className=" object-contain border"
        />
       </div>
        <h1 className="text-center mt-2 max-sm:mt-px text-xl w-full text-green-400 px-1">
          You can add transactions{" "}
        </h1>
      </Link>
      <Link href="/acounts" className="item item7 mx-3">
        {" "}
       <div className="w-[210px] h-[210px]">
       <Image
          height={176}
          width={176}
          src="/image3.jpg"
          alt="hello "
          className=" object-contain border"
        />
       </div>
        <h1 className="text-center mt-2 max-sm:mt-px text-xl w-full text-green-400 px-1">
          Make your financial management easy.{" "}
        </h1>
      </Link>
      <Link href="/categories" className="item item8 mx-3">
        {" "}
       <div className="w-[210px] h-[210px]">
       <Image
          height={176}
          width={176}
          src="/image4.jpg"
          alt="hello "
          className=" object-contain border"
        />
       </div>
        <h1 className="text-center mt-2 max-sm:mt-px text-xl w-full text-green-400 px-1">
          Let software handle your small tasks.
        </h1>
      </Link>
    </div>
  );
}

export default InfiteScroll;

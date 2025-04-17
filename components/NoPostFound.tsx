import React from 'react'
import Link from "next/link";
import ImageKit from "./Image";

const NoPostFound = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center h-[400px] gap-4 mb-8">
      <ImageKit
          src="/no-post-found.png"
          alt="featured post"
          width={200}
          height={200}
          className="rounded-2xl object-cover w-[150px] md:w-[180px] h-[150px] md:h-full"
        />
      <h1 className="text-2xl md:text-5xl font-bold">Oops!</h1>
      <p className="text-sm text-gray-500">No posts found for this category.</p>
      <Link href="/" className="bg-blue-300 text-white py-3 px-8 rounded-full font-semibold shadow-lg text-sm md:text-base">Go Home</Link>
    </div>
  )
}

export default NoPostFound
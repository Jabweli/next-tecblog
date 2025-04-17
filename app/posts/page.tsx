"use client";

import React, { useState, Suspense } from "react";
import PostList from "@/components/PostList";
import SideMenu from "@/components/SideMenu";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";

const Posts = () => {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();

  const category = searchParams.get("cat");
  const author = searchParams.get("author");

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="mb-8">
        {category && (
          <div className="flex gap-2 text-[15px] mb-5">
          <Link href="">Category</Link>
          <span>|</span>
          <span className="text-blue-800 capitalize">{category ? category : "All"}</span>
        </div>
      )}
      {author && (
          <div className="flex gap-2 text-[15px] mb-5">
          <Link href="">All posts from</Link>
          <span>:</span>
          <span className="text-blue-800 capitalize">{author}</span>
        </div>
      )}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="bg-blue-800 text-sm md:hidden mb-4 text-white py-2 px-4 rounded-2xl cursor-pointer"
        >
          {open ? "Close" : "Filter or search"}
        </button>
        <div className="flex flex-col-reverse md:flex-row gap-5">
          <div className="flex-1">
            <PostList />
          </div>

          <div className={`${open ? "block" : "hidden"} md:block`}>
            <SideMenu />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Posts;

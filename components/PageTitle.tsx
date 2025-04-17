"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

const PageTitle = () => {
  const searchParams = useSearchParams();

  const category = searchParams.get("cat");
  const author = searchParams.get("author");
  return (
    <>
      {category && (
        <div className="flex gap-2 text-[15px] mb-5">
          <Link href="">Category</Link>
          <span>|</span>
          <span className="text-blue-800 capitalize">
            {category ? category : "All"}
          </span>
        </div>
      )}
      {author && (
        <div className="flex gap-2 text-[15px] mb-5">
          <Link href="">All posts from</Link>
          <span>:</span>
          <span className="text-blue-800 capitalize">{author}</span>
        </div>
      )}
    </>
  );
};

export default PageTitle;

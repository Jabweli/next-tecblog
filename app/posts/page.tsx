"use client";

import React, { useState, Suspense } from "react";
import PostList from "@/components/PostList";
import SideMenu from "@/components/SideMenu";
import PageTitle from "@/components/PageTitle";

export default function Posts() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-8">
      <Suspense fallback={<p className="font-semibold">Loding title...</p>}>
        <PageTitle />
      </Suspense>
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
  );
}

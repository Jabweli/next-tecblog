import Link from "next/link";
import React from "react";
import Search from "./Search";

const MainCategories = () => {
  return (
    <div className="hidden sm:flex rounded-3xl xl:rounded-full bg-white p-4 shadow-lg items-center justify-center gap-8">
      <div className="flex-1 flex items-center justify-betweendd gap-4 flex-wrap">
        <Link
          href="/posts"
          className="bg-blue-800 text-white py-2 px-4 rounded-full text-sm"
        >
          All Posts
        </Link>
        <Link
          href="/posts?cat=web-design"
          className="hover:bg-blue-50 text-black py-2 px-4 rounded-full text-sm"
        >
          Web Design
        </Link>
        <Link
          href="/posts?cat=development"
          className="hover:bg-blue-50 text-black py-2 px-4 rounded-full text-sm"
        >
          Development
        </Link>
        <Link
          href="/posts?cat=databases"
          className="hover:bg-blue-50 text-black py-2 px-4 rounded-full text-sm"
        >
          Databases
        </Link>
        <Link
          href="/posts?cat=seo"
          className="hover:bg-blue-50 text-black py-2 px-4 rounded-full text-sm"
        >
          Search Engines
        </Link>
        <Link
          href="/posts?cat=marketing"
          className="hover:bg-blue-50 text-black py-2 px-4 rounded-full text-sm"
        >
          Marketing
        </Link>
      </div>
      <span className="text-xl font-medium">|</span>

      {/* search */}
      <Search />
    </div>
  );
};

export default MainCategories;

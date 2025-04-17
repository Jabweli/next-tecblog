"use client";
import Link from "next/link";
import React from "react";
import Search from "./Search";
import { useRouter, useSearchParams } from "next/navigation";

const SideMenu = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChangeSort = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (searchParams.get("sort") !== e.target.value) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("sort", e.target.value);
      router.push(`/posts?${params.toString()}`);
    }
  };
  return (
    <div className="px-4 h-max sticky top-8">
      {/* search */}
      <Search />

      {/* filters */}
      <div className="flex flex-col gap-4 my-8">
        <h2>Filters</h2>
        <div className="flex flex-col gap-2 text-sm">
          <label
            htmlFor="new"
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              name="sort"
              id="new"
              value="newest"
              onChange={handleChangeSort}
              className="appearance-none w-4 h-4 border-[1.5px] border-gray-800 cursor-pointer rounded-sm checked:bg-blue-800 bg-white"
            />
            Newest
          </label>

          <label
            htmlFor="popular"
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              name="sort"
              id="popular"
              value="popular"
              onChange={handleChangeSort}
              className="appearance-none w-4 h-4 border-[1.5px] border-gray-800 cursor-pointer rounded-sm checked:bg-blue-800 bg-white"
            />
            Most Popular
          </label>

          <label
            htmlFor="trending"
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              name="sort"
              id="trending"
              value="trending"
              onChange={handleChangeSort}
              className="appearance-none w-4 h-4 border-[1.5px] border-gray-800 cursor-pointer rounded-sm checked:bg-blue-800 bg-white"
            />
            Trending
          </label>
          <label
            htmlFor="oldest"
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              name="sort"
              id="oldest"
              value="oldest"
              onChange={handleChangeSort}
              className="appearance-none w-4 h-4 border-[1.5px] border-gray-800 cursor-pointer rounded-sm checked:bg-blue-800 bg-white"
            />
            Oldest
          </label>
        </div>
      </div>

      {/* categories*/}
      <div className="flex flex-col gap-4">
        <h2>Categories</h2>
        <div className="flex flex-col gap-2">
          <Link href="/posts" className="text-sm underline">
            All
          </Link>
          <Link href="/posts?cat=web-design" className="text-sm underline">
            Web Design
          </Link>
          <Link href="/posts?cat=development" className="text-sm underline">
            Development
          </Link>
          <Link href="/posts?cat=databases" className="text-sm underline">
            Databases
          </Link>
          <Link href="/posts?cat=seo" className="text-sm underline">
            Search Engines
          </Link>
          <Link href="/posts?cat=marketing" className="text-sm underline">
            Marketing
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;

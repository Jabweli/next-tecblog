"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const params = new URLSearchParams(searchParams.toString());
      params.set("search", search);
      router.push(`/posts?${params.toString()}`);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-gray-100 p-3 px-4 rounded-full flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="gray"
        >
          <circle cx="10.5" cy="10.5" r="7.5" />
          <line x1="16.5" y1="16.5" x2="22" y2="22" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          placeholder="Search a post..."
          className="bg-transparent placeholder:text-[14px] outline-0 text-[15px]"
        />
      </div>
    </div>
  );
};

export default Search;

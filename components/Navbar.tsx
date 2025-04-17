"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState } from "react";
import { FaAlignRight, FaXmark } from "react-icons/fa6";
import ImageKit from "./Image";
import { useUser } from "@clerk/nextjs";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between">
      {/* logo */}
      <Link
        href="/"
        className="flex items-center gap-2 text-xl 2xl:text-2xl font-bold"
      >
        <ImageKit
          src="/logo.png"
          width={32}
          height={32}
          alt="logo"
          className="w-8 h-8"
        />
        <span>tecBlog.</span>
      </Link>
      {/* mobile menu */}
      <div className="md:hidden">
        <div
          className="text-xl cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <FaXmark size={28} /> : <FaAlignRight size={24} />}
        </div>

        <div
          className={`w-full h-screen bg-[#e6e6ff] flex flex-col items-center justify-center absolute top-16 transition-all ease-in-out gap-8 z-[999] font-semibold ${
            open ? "-right-0" : "-right-[100%]"
          }`}
        >
          <Link href="/">Home</Link>
          <Link href="/posts?sort=trending">Trending</Link>
          <Link href="/posts?sort=popular">Most popular</Link>
          <Link href="/about">About</Link>
          {user && <Link href="/write">Write</Link>}
          <SignedOut>
            <Link
              href="/sign-in"
              className="py-2 px-4 rounded-3xl bg-blue-800 text-white hover:bg-blue-800/50"
            >
              Login🤚
            </Link>
          </SignedOut>
        </div>
      </div>

      {/* desktop menu */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 text-[15px] font-medium">
        <Link href="/">Home</Link>
        <Link href="/posts?sort=trending">Trending</Link>
        <Link href="/posts?sort=popular">Most popular</Link>
        <Link href="/about">About</Link>
        {user && <Link href="/write">Write</Link>}
        <SignedOut>
          <Link
            href="/sign-in"
            className="py-2 px-4 rounded-3xl bg-blue-800 text-white hover:bg-blue-800/50"
          >
            Login🤚
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;

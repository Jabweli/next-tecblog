"use client";

import Link from "next/link";
import React from "react";
import ImageKit from "./Image";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";
import LoadingSpinner from "./LoadingSpinner";

const fetchPosts = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/posts?featured=true&limit=4&sort=newest`
  );
  return res.data;
};

const FeaturedPosts = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: () => fetchPosts(),
  });

  // if (isPending) return <LoadingSpinner />;

  const posts = data?.posts;
  if (!posts) return;

  return (
    <div className="mt-8 flex flex-col md:flex-row gap-8">
      {posts[0] && (
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <ImageKit
            src={posts[0].img}
            alt="featured post"
            width={800}
            height={533}
            className="w-full rounded-3xl object-cover"
          />

          <div className="flex items-center gap-4">
            <h1 className="font-semibold text-sm 2xl:text-lg">01.</h1>
            <Link
              href={`/posts?cat=${posts[0].category}`}
              className="text-blue-800 text-sm 2xl:text-lg capitalize"
            >
              {posts[0].category}
            </Link>
            <span className="text-gray-500 text-sm 2xl:text-lg">
              {format(posts[0].createdAt)}
            </span>
          </div>

          <Link
            href={`/post/${posts[0].slug}`}
            className="text-xl lg:text-2xl font-semibold lg:font-bold"
          >
            {posts[0].title}
          </Link>
        </div>
      )}

      <div className="w-full md:w-1/2 flex flex-col gap-4">
        {posts[1] && (
          <div className="lg:h-1/3 flex justify-between gap-4">
            <ImageKit
              src={posts[1].img}
              alt="featured post"
              width={200}
              height={133}
              className="w-1/3 rounded-xl object-cover aspect-video"
            />
            <div className="flex flex-col gap-2 md:gap-3">
              <div className="flex items-center gap-2 text-sm">
                <h1 className="font-semibold">02.</h1>
                <Link
                  href={`/posts?cat=${posts[1].category}`}
                  className="text-blue-800 capitalize"
                >
                  {posts[1].category}
                </Link>
                <span className="text-gray-500">
                  {format(posts[1].createdAt)}
                </span>
              </div>

              <Link
                href={`/post/${posts[1].slug}`}
                className="text-base sm:text-lg xl:text-xl font-medium"
              >
                {posts[1].title}
              </Link>
              <span className="text-xs text-gray-500 line-clamp-2 lg:line-clamp-3">{posts[1].desc}</span>
            </div>
          </div>
        )}
        {posts[2] && (
          <div className="lg:h-1/3 flex justify-between gap-4">
            <ImageKit
              src={posts[2].img}
              alt="featured post"
              width={200}
              height={133}
              className="w-1/3 rounded-xl object-cover aspect-video"
            />
            <div className="flex flex-col gap-2 md:gap-3">
              <div className="flex items-center gap-2 text-sm">
                <h1 className="font-semibold">03.</h1>
                <Link
                  href={`/posts?cat=${posts[2].category}`}
                  className="text-blue-800 capitalize"
                >
                  {posts[2].category}
                </Link>
                <span className="text-gray-500">
                  {format(posts[2].createdAt)}
                </span>
              </div>

              <Link
                href={`/post/${posts[2].slug}`}
                className="text-base sm:text-lg xl:text-xl font-medium"
              >
                {posts[2].title}
              </Link>
              <span className="text-xs text-gray-500 line-clamp-2 lg:line-clamp-3">{posts[2].desc}</span>
            </div>
          </div>
        )}
        {posts[3] && (
          <div className="lg:h-1/3 flex justify-between gap-4">
            <ImageKit
              src={posts[3].img}
              alt="featured post"
              width={200}
              height={133}
              className="w-1/3 rounded-xl object-cover aspect-video"
            />
            <div className="flex flex-col gap-2 md:gap-3">
              <div className="flex items-center gap-2 text-sm">
                <h1 className="font-semibold">04.</h1>
                <Link
                  href={`/posts?cat=${posts[3].category}`}
                  className="text-blue-800 capitalize"
                >
                  {posts[3].category}
                </Link>
                <span className="text-gray-500">
                  {format(posts[3].createdAt)}
                </span>
              </div>

              <Link
                href={`/post/${posts[3].slug}`}
                className="text-base sm:text-lg xl:text-xl font-medium"
              >
                {posts[3].title}
              </Link>
              <span className="text-xs text-gray-500 line-clamp-2 lg:line-clamp-3">{posts[3].desc}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedPosts;

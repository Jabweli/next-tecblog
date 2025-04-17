import Link from "next/link";
import React from "react";
import ImageKit from "./Image";
import { format } from "timeago.js";

const PostListItem = ({ post }: { post: any }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 items-stretch">
      <div className="md:hidden lg:block xl:w-1/3 min-h-[210px]">
        <ImageKit
          src={post.img}
          alt="featured post"
          width={400}
          height={267}
          className="rounded-2xl object-cover w-full h-full"
        />
      </div>

      <div className="flex flex-col gap-4 xl:w-2/3">
        <Link
          href={`/post/${post.slug}`}
          className="text-lg sm:text-xl md:text-2xl 2xl:text-3xl font-semibold"
        >
          {post.title}
        </Link>

        <div className="flex items-center gap-2 text-gray-400 text-sm flex-wrap">
          <span>Written by</span>
          <Link
            href={`/posts?author=${post.user.username}`}
            className="text-blue-800 capitalize"
          >
            {post.user.username}
          </Link>
          <span>on</span>
          <Link
            href={`/posts?cat=${post.category}`}
            className="text-blue-800 capitalize"
          >
            {post.category}
          </Link>
          <span>{format(post.createdAt)}</span>
        </div>

        <p className="text-[15px]">{post.desc}</p>

        <Link
          href={`/post/${post.slug}`}
          className="text-blue-800 underline text-sm"
        >
          Read more
        </Link>
      </div>
    </div>
  );
};

export default PostListItem;

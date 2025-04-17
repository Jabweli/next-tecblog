"use client";
import PostMenuActions from "./PostMenuActions";
import Link from "next/link";
import ImageKit from "./Image";
import Comments from "./Comments";
import { format } from "timeago.js";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Search from "./Search";
import { notFound } from "next/navigation";
import LoadingSpinner from "./LoadingSpinner";

const fetchPost = async (slug: string) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/posts/${slug}`
  );
  return res.data;
};

const SinglePost = ({ slug }: { slug: string }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });

  if (isPending) return <LoadingSpinner />;
  if (error) return "Something went wrong" + error.message;
  if (!data) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-8 mb-8">
      <div className="flex flex-col-reverse md:flex-row gap-5">
        <div className="flex flex-col gap-3 lg:gap-6 lg:w-3/5">
          <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold">
            {data.title}
          </h1>

          <div className="flex items-center gap-2 text-gray-400 text-sm flex-wrap">
            <span>Written by</span>
            <Link
              href={`/posts?author=${data.user.username}`}
              className="text-blue-800 capitalize"
            >
              {data.user.username}
            </Link>
            <span>on</span>
            <Link
              href={`/posts?cat=${data.category}`}
              className="text-blue-800 capitalize"
            >
              {data.category}
            </Link>
            <span>{format(data.createdAt)}</span>
          </div>

          <p className="text-[15px] text-justifydd">{data.desc}</p>
        </div>

        <div className="lg:w-2/5 h-[250px]">
          <ImageKit
            src={data.img}
            alt="post image"
            width={735}
            height={489}
            className="rounded-2xl object-cover h-full"
          />
        </div>
      </div>

      {/* content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* main content - left side */}
        <div className="w-full md:w-9/12 flex flex-col gap-5">
          <div
            dangerouslySetInnerHTML={{ __html: data.content }}
            className="text-[15px]"
          />
          <Comments postId={data._id} />
        </div>

        {/* right side bar */}
        <div className="w-full md:w-3/12 flex flex-col gap-8">
          {/* author */}
          <div className="flex flex-col gap-3">
            <h2>Author</h2>
            <div className="flex items-center gap-3">
              <ImageKit
                src={data.user.img || "https://avatar.iran.liara.run/public/44"}
                alt="author"
                width={60}
                height={60}
                className="rounded-full w-12 h-12 object-cover"
              />
              <h4 className="text-gray-600 mb-0 pb-0 capitalize">
                {data.user.username}
              </h4>
            </div>
            <p className="text-sm text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
            <div className="flex gap-2">
              <ImageKit
                src="facebook.svg"
                alt="facebook"
                width={24}
                height={24}
              />
              <ImageKit
                src="instagram.svg"
                alt="instagram"
                width={24}
                height={24}
              />
            </div>
          </div>

          {/* actions */}
          <PostMenuActions post={data} />

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

          {/* search */}
          <Search />
        </div>
      </div>
    </div>
  );
};

export default SinglePost;

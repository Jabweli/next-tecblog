import FeaturedPosts from "@/components/FeaturedPosts";
import MainCategories from "@/components/MainCategories";
import PostList from "@/components/PostList";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="mt-4 flex flex-col gap-4">
      <div className="flex gap-4 text-[15px]">
        <Link href="/">Home</Link>
        <span>.</span>
        <span className="text-blue-800">Blogs and Articles</span>
      </div>

      {/* introduction */}
      <div className="flex items-center justify-between gap-6">
        <div>
          <h1 className="text-gray-800 text-2xl md:text-3xl lg:text-5xl 2xl:text-6xl font-bold">
            Build your own sign-up page for your Next.js app with Clerk
          </h1>
          <p className=" mt-3 md:mt-8 text-[16px] 2xl:text-lg">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla
            repudiandae deserunt ab doloremque quae expedita alias.
          </p>
        </div>

        <Link href="/write" className="hidden md:block relative cursor-pointer">
          <svg
            viewBox="0 0 200 200"
            width="200"
            height="200"
            className="text-lg tracking-wide animate-spin animatedBtn"
          >
            <path
              id="circlePath"
              d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
              fill="none"
            />
            <text>
              <textPath href="#circlePath" startOffset="0%">
                Write your story *
              </textPath>
              <textPath href="#circlePath" startOffset="50%">
                Share your idea *
              </textPath>
            </text>
          </svg>

          <button className="absolute top-0 left-0 right-0 bottom-0 m-auto w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="50"
              height="50"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <line x1="6" y1="18" x2="18" y2="6" />
              <polyline points="9 6 18 6 18 15" />
            </svg>
          </button>
        </Link>
      </div>

      {/* categories */}
      <Suspense fallback={<p className="font-semibold">Loading...</p>}>
        <MainCategories />
      </Suspense>
      <FeaturedPosts />

      {/* recent posts */}
      <div className="">
        <h1 className="mt-8 mb-5 text-2xl text-gray-600">Recent posts</h1>
        <PostList />
      </div>
    </div>
  );
}

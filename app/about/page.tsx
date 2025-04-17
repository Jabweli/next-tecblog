import React from "react";
import Link from "next/link";

export default function About() {
  return (
    <div className="flex items-center justify-center h-[80vh] px-4 rounded-xl mb-8">
      <div className="text-center max-w-xl">
        <h1 className="text-6xl font-extrabold text-blue-600">Coming Soon</h1>
        <p className="text-xl md:text-3xl font-semibold mt-6">
          Stay tuned — we&apos;ll be launching very soon.
        </p>
        <p className="mt-4 text-gray-500">
          We&apos;re working hard behind the scenes to bring you something
          awesome!
        </p>
        <Link
          href="/"
          className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 transition"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}

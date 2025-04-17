"use client";

import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {

  return (
    <div className="flex items-center justify-center h-[80vh] bg-gray-100ggg px-4 mb-8 rounded-xl">
      <div className="text-center max-w-lg">
        <h1 className="text-2xl lg:text-5xl font-bold text-red-600">
          Something went wrong
        </h1>
        <p className="mt-4 text-gray-600 text-sm md:text-lg">
          We&apos;re really sorry about this. An unexpected error has occurred.
        </p>
        <p className="mt-2 text-sm text-gray-400">
          {error?.message || "Unknown error"}
        </p>
        <div className="mt-6 flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="text-sm md:text-base px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Try again
          </button>
          <Link
            href="/"
            className="text-sm md:text-base px-5 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-[80vh] px-4 rounded-xl mb-8">
      <div className="text-center max-w-lg">
        <h1 className="text-9xl font-extrabold text-blue-600">404</h1>
        <p className="text-2xl md:text-3xl font-semibold mt-6">
          Oops! Page not found.
        </p>
        <p className="mt-4 text-gray-500">
          The page you're looking for doesn&apos;t exist or has been moved.
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

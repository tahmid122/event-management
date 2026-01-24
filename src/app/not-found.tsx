import Link from "next/link";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center text-white">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
          <FaExclamationTriangle className="text-4xl text-red-500" />
        </div>

        <h1 className="text-8xl font-extrabold tracking-tight text-whiter">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>

        <p className="mt-2 max-w-md text-gray-400">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-transparent px-6 py-3 text-sm font-medium text-white transition border border-pinkish"
        >
          <FaHome />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

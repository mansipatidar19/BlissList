import React from "react";
import { Link } from "react-router-dom";
function NotFound() {
  return (
    <>
      <div className="bg-yellow-100 h-screen flex items-center justify-center">
        <div className="bg-slate-50 p-8 pb-7 rounded-xl shadow-lg w-full max-w-80 md:max-w-md">
          <h1 className="text-3xl font-bold font-sans text-amber-900 pb-1 text-center">
            OOPS!
          </h1>
          <div>
            <p className="text-sm text-center font-sans text-amber-900">
              The page you are looking for does not exist.
            </p>
            <div className="mt-6 text-center">
            <Link to="/">
              <button className="font-sans focus:outline-none rounded-full bg-amber-900 hover:bg-amber-800 text-white px-4 py-2 shadow-md">
                Go back to Home Page!
              </button>
            </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;

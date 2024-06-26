import React from "react";
import { Link, NavLink } from "react-router-dom";

const AppBar = () => {
  return (
    <div className="border-b-2 flex justify-between items-center fixed top-0 w-full bg-white z-10">
      <div className="py-6 px-8">
        <Link to="/" className="font-bold">
          DAILYGROW
        </Link>
      </div>
      <div className="py-6 px-6 flex">
        <div className="px-2">
          <Link
            to="/"
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded-md shadow"
          >
            Home
          </Link>
        </div>
        <div className="px-5">
          <Link
            to="/todo/create"
            className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 shadow"
          >
            Create
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AppBar;

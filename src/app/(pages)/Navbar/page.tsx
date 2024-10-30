"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
// import { FaSearch } from "react-icons/fa"; // Import the search icon from react-icons

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const { data: session } = useSession(); // Access session data

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", query);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center">
      {/* Logo */}
      <div>
        <h1 className="text-2xl font-bold">Swap_Spot</h1>
      </div>

      {/* Links: Deals and What's New */}
      <div className="flex space-x-8 text-lg">
        <a href="#" className="text-gray-700 hover:text-gray-900">
          Deals
        </a>
        <a href="#" className="text-gray-700 hover:text-gray-900">
          What's New
        </a>
      </div>

      {/* Search Bar */}
      <div className="flex items-center">
        <form onSubmit={handleSearch} className="w-full max-w-sm mr-6">
          <div className="flex items-center border border-gray-300 rounded-full py-2 px-3">
            <input
              type="text"
              className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {/* Search Button with Icon */}
            <button
              type="submit"
              className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 text-white rounded-full p-2"
            >
              {/* <FaSearch /> React icon for search */}
            </button>
          </div>
        </form>

        {/* Dropdown */}
        <div className="relative inline-block text-left">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={toggleDropdown}
          >
            Options
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isOpen && (
            <div
              className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="py-1" role="none">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Account settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  Support
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  License
                </a>
                <form method="POST" action="#">
                  <button
                    type="submit"
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Sign out
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Profile Image */}
        {session?.user?.image && (
          <div className="ml-4">
            <Image
              src={session.user.image}
              alt={`${session.user.name}'s profile image`}
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;

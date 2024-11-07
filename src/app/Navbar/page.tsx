"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // if (status === "loading") return;
    // if (status === "unauthenticated") {
    //   router.push("/login");
    // }
    // if (status === "authenticated") {
    //   // router.push("/dashboard");
    // }
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [router, status]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);
  //   const toggleProfileDropdown = () => setIsProfileOpen(!isProfileOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", query);
  };

  const NavLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={`${
          isActive
            ? "text-blue-600 font-medium"
            : "text-gray-700 hover:text-blue-600"
        } transition duration-150 ease-in-out`}
      >
        {children}
      </Link>
    );
  };

  const handleSignOut = async () => {
    try {
      const { signOut } = await import("next-auth/react");
      await signOut({ redirect: false });
      router.push("/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <>
      <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                Swap Spot
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink href="/deals">Deals</NavLink>
              <NavLink href="/products">ListProduct</NavLink>
              <NavLink href="/">ChatBox</NavLink>

              {/* Categories Dropdown */}
              <div className="relative">
                <button
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition duration-150 ease-in-out"
                  onClick={toggleDropdown}
                >
                  <span>Categories</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    {[
                      "🤖Electronics",
                      "🛋️Furniture",
                      "👔Fashion",
                      "👽Others",
                    ].map((category) => (
                      <Link
                        key={category}
                        href={`/category/${category
                          .substring(1)
                          .toLowerCase()}`}
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 transition duration-150"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Search Bar and Profile */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div
                className={`transition-all duration-300 ease-in-out transform ${
                  isSearchExpanded && !isMobile ? "w-80 scale-105" : "w-48"
                }`}
              >
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    className="w-full bg-gray-100 text-black rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    placeholder={
                      isSearchExpanded ? "Search for items..." : "Search..."
                    }
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => !isMobile && setIsSearchExpanded(true)} // Only expand on focus if not mobile
                    onBlur={() => !isMobile && setIsSearchExpanded(false)} // Only collapse on blur if not mobile
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </form>
              </div>

              {/* Profile */}
              {session?.user && (
                <div ref={profileRef} className="relative">
                  <button
                    onClick={handleProfileClick}
                    className="flex items-center space-x-2 focus:outline-none"
                    aria-expanded={isProfileOpen}
                    aria-haspopup="true"
                  >
                    <div className="relative">
                      {session.user.image && (
                        <Image
                          src={session.user.image}
                          alt="Profile"
                          width={50}
                          height={40}
                          className={`rounded-full ring-2 transition-all duration-200 ${
                            isProfileOpen ? "ring-blue-500" : "ring-white"
                          }`}
                        />
                      )}
                    </div>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {session.user.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {session.user.email}
                        </p>
                      </div>

                      <div className="py-2">
                        <Link
                          href="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          👤 View Profile
                        </Link>
                        <Link
                          href="/settings"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          ⚙️ Settings
                        </Link>
                        <Link
                          href="/purchases"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          🛍️ My Purchases
                        </Link>
                      </div>

                      <div className="border-t border-gray-100 pt-2">
                        <button
                          onClick={handleSignOut}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          🚪 Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-700 hover:text-blue-600 transition duration-150"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/deals"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              >
                Deals
              </Link>
              <Link
                href="/whats-new"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              >
                What&apos;s New
              </Link>
              <Link
                href="/categories"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              >
                Categories
              </Link>
            </div>
          </div>
        )}
      </nav>
      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const NavBarSm = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility

  const toggleMenu = () => setIsOpen((prevState) => !prevState); // Toggle menu state

  const userRole =
    typeof window !== "undefined" ? localStorage.getItem("userRole") : null;

  return (
    <nav className="bg-gray-800 text-white py-2">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link href="/public" className="flex items-center">
          <Image src="/logo.svg" alt="IHA Logo" width={200} height={60} />
        </Link>

        {/* Hamburger Icon */}
        <button onClick={toggleMenu} className="lg:hidden p-2">
          {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>

      {/* Dropdown Menu */}
      <div
        className={`lg:hidden ${isOpen ? "block" : "hidden"} transition-all duration-300`}
      >
        <ul className="flex flex-col bg-gray-800">
          {/* Dashboard Link */}
          <li className="py-2 px-4 border-b border-gray-700">
            <Link href="/public" className="hover:text-gray-400">
              Dashboard
            </Link>
          </li>

          {/* Onboard Dropdown */}
          <li className="py-2 px-4 border-b border-gray-700">
            <button className="w-full text-left hover:text-gray-400">
              Onboard
            </button>
            <ul className="flex flex-col">
              <li className="py-2 px-4">
                <Link
                  href="/clinical-trial-request"
                  className="hover:text-gray-400"
                >
                  Clinical Trials
                </Link>
              </li>
              <li className="py-2 px-4">
                <Link
                  href="/product-registration-request"
                  className="hover:text-gray-400"
                >
                  Product Registrations
                </Link>
              </li>
              <li className="py-2 px-4">
                <Link
                  href="/facility-registration-request"
                  className="hover:text-gray-400"
                >
                  Facility Registrations
                </Link>
              </li>
              <li className="py-2 px-4 border-t border-gray-700">
                <Link href="/contact-form" className="hover:text-gray-400">
                  Contact Us
                </Link>
              </li>
            </ul>
          </li>

          {/* IHA Dropdown */}
          <li className="py-2 px-4 border-b border-gray-700">
            <button className="w-full text-left hover:text-gray-400">
              IHA
            </button>
            <ul className="flex flex-col">
              <li className="py-2 px-4">
                <Link
                  href="/publications/create"
                  className="hover:text-gray-400"
                >
                  Create Publication
                </Link>
              </li>
              <li className="py-2 px-4">
                <Link href="/publications" className="hover:text-gray-400">
                  View Publications
                </Link>
              </li>
              <li className="py-2 px-4">
                <Link href="/users" className="hover:text-gray-400">
                  View Users
                </Link>
              </li>
            </ul>
          </li>

          {/* Admin Dropdown (Conditionally Rendered) */}
          {userRole === "SA" || userRole === "PA" ? (
            <li className="py-2 px-4 border-b border-gray-700">
              <button className="w-full text-left hover:text-gray-400">
                Admin
              </button>
              <ul className="flex flex-col">
                <li className="py-2 px-4">
                  <Link href="/user-profile" className="hover:text-gray-400">
                    User Profile
                  </Link>
                </li>
                <li className="py-2 px-4">
                  <Link href="/create-admin" className="hover:text-gray-400">
                    Create Admin
                  </Link>
                </li>
                <li className="py-2 px-4">
                  <Link href="/user-management" className="hover:text-gray-400">
                    User Management
                  </Link>
                </li>
              </ul>
            </li>
          ) : null}

          {/* Settings and Logout */}
          <li className="py-2 px-4 border-b border-gray-700">
            <Link href="/settings" className="hover:text-gray-400">
              Settings
            </Link>
          </li>
          <li className="py-2 px-4">
            <Link href="/sign-out" className="hover:text-gray-400">
              Log out
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBarSm;

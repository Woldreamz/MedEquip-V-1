import Image from "next/image";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    // Retrieve the user object from localStorage on the client side
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setProfile(JSON.parse(storedUser));
    }
  }, []);
  if (!profile) {
    return <div>Loading...</div>; // Show a loading state until user data is loaded
  }


  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md p-2 z-10">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Left section - Logo or other content */}
        <div className="flex items-center">
          {/* Add content for the left side if needed */}
        </div>

        {/* Right section - Profile */}
        <div className="flex items-center ml-auto">
          {/* Pill-shaped profile section */}
          <div className="relative flex items-center bg-gray-100 p-1 pl-2 pr-3 rounded-full shadow-md h-12">
            {/* Profile Image */}
            <Image
              width={40} // Increased size by 1/3
              height={40} // Increased size by 1/3
              src="/work.svg"
              alt="Profile"
              className="w-10 h-10 rounded-full" // Adjusted for scaling
            />
            {/* Name and Designation */}
            <div className="ml-3 pt-4">
              <p className="text-sm font-semibold text-gray-800 leading-3">
                {profile.firstname} {profile.lastname}
              </p>
              <p className="text-sm text-gray-500">{profile.role}</p>
            </div>
            {/* Dropdown Icon */}
            <button
              className="ml-2 text-gray-600 hover:text-gray-800 text-xs leading-none px-1.5"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              ▼
            </button>
            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute top-12 right-0 bg-white border border-gray-200 rounded-md shadow-lg w-40">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <a href="/auth/profile">Account</a>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    <a href="/settings">Settings</a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

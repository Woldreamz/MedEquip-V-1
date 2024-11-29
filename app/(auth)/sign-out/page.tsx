"use client";

import { useRouter } from "next/navigation"; // Import useRouter for navigation
import BaseLayout from "../../../components/BaseLayout"; // Ensure this path matches your folder structure

const Logout = () => {
  const router = useRouter(); // Initialize the router

  const handleLogout = () => {
    // Perform any necessary logout logic here (e.g., clearing tokens, sessions, etc.)
    console.log("User logged out");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user"); // Remove the user data from local storage
    // Redirect to the Sign-In page
    router.push("/sign-in");
  };

  return (
    <BaseLayout>
      <div className="flex bg-gray-100 min-h-screen">
        {/* Sidebar */}
        <div className="hidden md:block md:w-1/5 bg-white shadow-lg">
          {/* Sidebar content if needed */}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 space-y-10 lg:ml-1/4 pt-20">
          <header>
            <h3 className="text-2xl font-semibold text-gray-800">Log Out</h3>
            <p className="text-sm text-gray-500">
              Are you sure you want to log out from your account?
            </p>
          </header>

          {/* Main Content Container */}
          <div className="bg-white shadow-xl rounded-xl p-8 flex flex-col items-center space-y-6">
            <div className="text-center">
              <p className="text-gray-700 text-lg">
                If you log out, you will need to enter your credentials again to
                access your account.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Your preferences and settings will be saved.
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
              >
                Log Out
              </button>
              <button
                onClick={() => window.history.back()}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg shadow-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Logout;

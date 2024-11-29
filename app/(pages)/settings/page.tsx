"use client";

import { useState, useEffect } from "react";
import BaseLayout from "../../../components/BaseLayout"; // Ensure this path matches your folder structure

const Settings = () => {
  const [profile, setProfile] = useState<any>(null);

  const [preferences, setPreferences] = useState({
    notifications: true,
    darkMode: false,
  });

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

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
    console.log(profile);
  };
  // const handleSubmit = async () => {
  //   try {
  //     const response = await fetch(`https://medequip-api.vercel.app/api/users/${profile.id}`,{
  //       method: 'PUT',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
  //       },
  //       body: JSON.stringify(profile),
  //     });
  //     if (response.ok) {
  //       //redirect to the email verification page after sucessfull submission
  //       const responseData = await response.json();
  //       console.log(responseData);
  //       alert("User updated  successfully");
  //     }else {
  //       const errorData = await response.json();
  //       console.error("Error: Failed to submit the form", errorData);
  //       alert("Failed to update the user information");
  //     }
  //   } catch (error) {
  //     console.error("An error occured:", error);
  //   }

  // }

  const togglePreference = (key: "notifications" | "darkMode") => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
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
            <h3 className="text-2xl font-semibold text-gray-800">Settings</h3>
            <p className="text-sm text-gray-500">
              Manage your account settings and preferences.
            </p>
          </header>

          {/* Main Content Container */}
          <div className="bg-white shadow-xl rounded-xl p-8 flex-1">
            {/* Profile Settings */}
            <section className="mb-10">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                Profile Settings
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    value={profile.firstname}
                    onChange={handleProfileChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    value={profile.lastname}
                    onChange={handleProfileChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={profile.phone}
                    onChange={handleProfileChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
            </section>

            {/* Preferences Section */}
            <section className="mb-10">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                Preferences
              </h4>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-600">
                  Email Notifications
                </span>
                <button
                  onClick={() => togglePreference("notifications")}
                  className={`w-12 h-6 flex items-center rounded-full px-1 transition-colors ${
                    preferences.notifications ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`h-4 w-4 bg-white rounded-full shadow-md transform transition ${
                      preferences.notifications ? "translate-x-6" : ""
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  Dark Mode
                </span>
                <button
                  onClick={() => togglePreference("darkMode")}
                  className={`w-12 h-6 flex items-center rounded-full px-1 transition-colors ${
                    preferences.darkMode ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`h-4 w-4 bg-white rounded-full shadow-md transform transition ${
                      preferences.darkMode ? "translate-x-6" : ""
                    }`}
                  />
                </button>
              </div>
            </section>

            {/* Save Changes Button */}
            <div className="flex justify-end">
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default Settings;

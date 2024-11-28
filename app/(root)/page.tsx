"use client";

import { useState, useEffect } from "react";
import Layout from "./layout";
import Navbar from "../../components/Navbar";
// import Sidebar from "@/components/Sidebar";
import Accounts from "../(pages)/auth/page";
import AllUsers from "../(pages)/auth/all-users/page";
import UserProfile from "../(pages)/auth/profile/page";
import DashboardContent from "../../components/Dashboardcontent"; // Importing DashboardContent
import withAuth from "../../hoc/WithAuth";

// Define SubItem type
type SubItem = {
  name: string;
};

function Home() {
  const [activeNav, setActiveNav] = useState<string>("dashboard");
  const [accountsSubNav, setAccountsSubNav] = useState<SubItem[]>([]);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    // Reset sub-navigation when switching to the 'dashboard' tab
    if (activeNav !== "accounts") {
      setAccountsSubNav([]);
    }
  }, [activeNav]);

  return (
    <div className="fixed bg-white relative flex flex-col md:flex-row h-screen">
      {/* Sidebar (uncomment when Sidebar is ready for use) */}
      {/* <Sidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        setAccountsSubNav={setAccountsSubNav}
      /> */}
      <Navbar />
      {/* Main Content */}
      {/* Dashboard Content */}
      {activeNav === "dashboard" && (
        <div className="flex flex-col gap-4 w-full md:ml-64">
          <DashboardContent /> {/* Rendering the DashboardContent */}
        </div>
      )}

      {/* Render specific Accounts sub-navigation components based on activeNav */}
      {activeNav === "accounts" && (
        <Layout>
          {accountsSubNav.some((subItem) => subItem.name === "Accounts") && (
            <Accounts />
          )}
          {accountsSubNav.some((subItem) => subItem.name === "All Users") && (
            <AllUsers />
          )}
          {accountsSubNav.some(
            (subItem) => subItem.name === "User Profile",
          ) && <UserProfile />}
        </Layout>
      )}
    </div>
  );
}

export default withAuth(Home);

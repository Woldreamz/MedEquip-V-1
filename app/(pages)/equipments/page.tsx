"use client";

import { useState, useEffect } from "react";
import EquipmentList from "../../../components/equipment/cardList";
import { MinorNav } from "../../../components/equipment/minorNav";
import add from "../../../public/icons/add.svg";
import React from "react";
import Layout from "../../(root)/layout";
import Navbar from "../../../components/Navbar";

const EquipmentsPage = () => {
  // State variables
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [equipmentList, setEquipmentList] = useState([]);

  useEffect(() => {
    const equipList = async () => {
      try {
        const response = await fetch(
          `https://medequip-api.vercel.app/api/equipment/`,
        );
        if (!response.ok)
          throw new Error("Failed to fetch equipment", response.json);
        const data = await response.json();
        console.log(data);
        setEquipmentList(data);
      } catch (error) {
        console.error(error);
      }
    };

    equipList();
  }, []);

  // Filter equipment based on search query
  const filteredEquipments = equipmentList.filter((equipment) =>
    equipment.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex bg-gray-100 flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <Layout>
        <div className="hidden md:block md:w-1/4 bg-white shadow-lg">
          {/* Sidebar content */}
        </div>
        <Navbar />
      </Layout>

      {/* Main Content */}
      <div className="flex-1 lg:ml-[20%] p-6 space-y-6 pt-20">
        {/* Header and Search */}
        <section className="bg-white p-6 rounded-lg shadow-md pt-10 pr-20">
          <MinorNav
            heading="Equipment List"
            btn="Add new"
            src={add}
            link="/equipments/basic_information"
            alt="add new"
          />
          {/* Search Bar */}
          <div className="mt-4 flex justify-between items-center">
            <input
              type="text"
              className="p-2 rounded-md border border-gray-300 w-full max-w-xs"
              placeholder="Search equipment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </section>

        {/* Equipment List Section */}
        <section className="bg-white p-6 rounded-lg shadow-md pt-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-100 text-red-800 p-4 rounded-md mb-4">
              <p>{error}</p>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="w-12 h-12 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-4 mt-4">
              <EquipmentList data={filteredEquipments} />
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Load More
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EquipmentsPage;

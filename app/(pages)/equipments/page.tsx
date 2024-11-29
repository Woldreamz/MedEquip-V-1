"use client";
import { useState, useEffect } from "react";
import EquipmentList from "../../../components/equipment/cardList";
import { Details } from "../../../components/equipment/forms/details";
import { MinorNav } from "../../../components/equipment/minorNav";
import add from "../../../public/icons/add.svg";
import React from "react";
import Layout from "../../(root)/layout";
import Navbar from "../../../components/Navbar";
import { BASE_URL } from "../../../api/base-url";

interface SearchParams {
  name: string
  dateAdded: string | number | Date
}

const EquipmentsPage = () => {
  // State variables
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("name_asc");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchedEquipmentList, setFetchedEquipmentList] = useState([]);
  const [equipmentList, setEquipmentList] = useState([]);

  // Fetch equipment list from the API
  useEffect(() => {
    const fetchEquipments = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${BASE_URL}/api/equipment`);

        if (!response.ok) {
          throw new Error("Failed to fetch equipment");
        }

        const data = await response.json();
        setFetchedEquipmentList(data); // Store fetched data
        setEquipmentList(data); // Initialize display list with fetched data
      } catch (error: any) {
        setError(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchEquipments();
  }, []);

  // Update the displayed equipment list when filters or sort options change
  useEffect(() => {
    const filteredAndSortedEquipment = fetchedEquipmentList
      .filter((equipment: Details) => {
        // Filter by search query and category
        const matchesSearch = equipment.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesCategory =
          selectedCategory === "all" || equipment.category === selectedCategory;

        return matchesSearch && matchesCategory;
      })
      .sort((a: SearchParams, b: SearchParams) => {
        // Sort based on selected option
        if (sortOption === "name_asc") {
          return a.name.localeCompare(b.name);
        } else if (sortOption === "name_desc") {
          return b.name.localeCompare(a.name);
        } else if (sortOption === "date_added_asc") {
          return new Date(a.dateAdded).getDate() - new Date(b.dateAdded).getDate();
        } else if (sortOption === "date_added_desc") {
          return new Date(b.dateAdded).getDate() - new Date(a.dateAdded).getDate();
        }
        return 0;
      });

    setEquipmentList(filteredAndSortedEquipment);
  }, [fetchedEquipmentList, searchQuery, selectedCategory, sortOption]);

  console.log(equipmentList);

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
          {/* Search and Filters */}
          <div className="mt-4 pl-20 flex flex-col lg:flex-row justify-between items-center gap-4">
            <input
              type="text"
              className="p-2 rounded-md border border-gray-300 w-full max-w-xs"
              placeholder="Search equipment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <select
              className="p-2 rounded-md border border-gray-300"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="Imaging">Imaging</option>
              <option value="Surgical">Surgical</option>
              <option value="Diagnostic">Diagnostic</option>
            </select>

            <select
              className="p-2 rounded-md border border-gray-300"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="name_asc">Name: A-Z</option>
              <option value="name_desc">Name: Z-A</option>
              <option value="date_added_desc">Date Added: Newest</option>
              <option value="date_added_asc">Date Added: Oldest</option>
            </select>
          </div>
        </section>

        {/* Equipment List Section */}
        <section className="bg-white p-6 pr-20 rounded-lg shadow-md pt-6">
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
              <EquipmentList data={equipmentList} />
            </div>
          )}

          {/* Pagination Placeholder */}
          <div className="flex justify-center mt-6">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={() => alert("Pagination coming soon!")}
            >
              Load More
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EquipmentsPage;

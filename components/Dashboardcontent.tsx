import { useState } from "react";
import { FaClock, FaChevronDown } from "react-icons/fa";
import {
  format,
  isToday,
  isYesterday,
  startOfWeek,
  endOfWeek,
  subMonths,
  isWithinInterval,
} from "date-fns";
import Card from "./Card";
import Layout from "../app/(root)/layout"; // Assuming this is the correct path
import Navbar from "./Navbar";

type TableData = {
  user: string;
  recentSearch: string;
  dateTime: string;
};

const DashboardContent = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Today");
  const [sortColumn, setSortColumn] = useState<keyof TableData | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const initialData: TableData[] = [
    {
      user: "Daniel Benson",
      recentSearch: "2 Pack Trauma Shears",
      dateTime: "2024-11-26 09:36 AM", // Updated date
    },
    {
      user: "Emily Watson",
      recentSearch: "Pulse Oximeter",
      dateTime: "2024-11-25 02:30 PM", // Updated date
    },
    {
      user: "John Doe",
      recentSearch: "Surgical Scissors",
      dateTime: "2024-11-12 10:45 AM", // Updated date
    },
    {
      user: "Alice Green",
      recentSearch: "Blood Pressure Monitor",
      dateTime: "2024-10-03 01:15 PM", // Updated date
    },
    {
      user: "Michael Scott",
      recentSearch: "Sterile Gloves",
      dateTime: "2024-09-25 08:00 AM", // Updated date
    },
    {
      user: "Sarah Johnson",
      recentSearch: "Thermometer",
      dateTime: "2024-06-15 11:30 AM",
    },
    {
      user: "Chris Walker",
      recentSearch: "X-Ray Gloves",
      dateTime: "2024-06-2 03:00 PM",
    },
    {
      user: "David Brown",
      recentSearch: "Bandage Roll",
      dateTime: "2023-04-10 02:15 PM",
    },
    {
      user: "Linda Taylor",
      recentSearch: "Surgical Mask",
      dateTime: "2023-03-25 09:45 AM",
    },
    {
      user: "Paul Adams",
      recentSearch: "Gauze Pads",
      dateTime: "2023-02-17 01:30 PM",
    },
    {
      user: "Nina Cooper",
      recentSearch: "Disinfectant Wipes",
      dateTime: "2023-01-10 10:00 AM",
    },
  ];
  const [tableData, setTableData] = useState<TableData[]>(initialData);

  // Toggles dropdown visibility
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  // Handles selection of dropdown options
  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    setDropdownOpen(false);
    console.log(`Filter selected: ${filter}`);

    const now = new Date();
    let filteredData: TableData[] = initialData;

    switch (filter) {
      case "Today":
        filteredData = initialData.filter((item) =>
          isToday(new Date(item.dateTime)),
        );
        break;

      case "Yesterday":
        filteredData = initialData.filter((item) =>
          isYesterday(new Date(item.dateTime)),
        );
        break;

      case "This Week":
        filteredData = initialData.filter((item) =>
          isWithinInterval(new Date(item.dateTime), {
            start: startOfWeek(now),
            end: endOfWeek(now),
          }),
        );
        break;

      case "Last Week":
        const startOfLastWeek = startOfWeek(subMonths(now, 0), {
          weekStartsOn: 1,
        });
        const endOfLastWeek = endOfWeek(startOfLastWeek);
        filteredData = initialData.filter((item) =>
          isWithinInterval(new Date(item.dateTime), {
            start: startOfLastWeek,
            end: endOfLastWeek,
          }),
        );
        break;

      case "Last 3 Months":
        filteredData = initialData.filter((item) =>
          isWithinInterval(new Date(item.dateTime), {
            start: subMonths(now, 3),
            end: now,
          }),
        );
        break;

      case "Last 6 Months":
        filteredData = initialData.filter((item) =>
          isWithinInterval(new Date(item.dateTime), {
            start: subMonths(now, 6),
            end: now,
          }),
        );
        break;

      case "Last Year":
        filteredData = initialData.filter(
          (item) =>
            new Date(item.dateTime).getFullYear() === now.getFullYear() - 1,
        );
        break;

      default:
        break; // Return the full dataset for invalid or default filters
    }

    // Apply sort after filter
    if (sortColumn) {
      filteredData = sortData(filteredData, sortColumn, sortDirection);
    }
    setTableData(filteredData);
  };

  // Sorting function
  const handleSort = (column: keyof TableData) => {
    const newDirection =
      sortColumn === column && sortDirection === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortDirection(newDirection);
    setTableData(sortData([...tableData], column, newDirection));
  };

  // Utility function for sorting
  const sortData = (
    data: TableData[],
    column: keyof TableData,
    direction: "asc" | "desc",
  ) => {
    if (data.length === 0) return data; // Guard for empty dataset

    return data.sort((a, b) => {
      const valueA =
        column === "dateTime"
          ? new Date(a[column]).getTime()
          : String(a[column]).toLowerCase();
      const valueB =
        column === "dateTime"
          ? new Date(b[column]).getTime()
          : String(b[column]).toLowerCase();

      if (valueA < valueB) return direction === "asc" ? -1 : 1;
      if (valueA > valueB) return direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  function handleViewAll() {
    setTableData(initialData); // Reset to full dataset
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Layout>
        <div className="hidden md:block md:w-1/4 bg-white shadow-lg">
          {/* Sidebar content if needed */}
        </div>
        <Navbar />
      </Layout>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6 pt-20 bg-gray-100">
        {/* Dashboard Header */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card
            title="Total Users"
            value="4,099"
            trend="↑ 8.5%"
            trendType="up"
            iconSrc="/icons/Icon.svg"
            iconWidth={150}
            iconHeight={150}
            className="h-8 w-8"
          />
          <Card
            title="Total Searches"
            value="89,000"
            trend="↓ 4.3%"
            trendType="down"
            iconSrc="/icons/reshape.svg"
            iconWidth={150}
            iconHeight={150}
            className="h-8 w-8"
          />
          <Card
            title="Total Matches"
            value="2,040"
            trend="↑ 1.8%"
            trendType="up"
            iconSrc="/icons/combineshape.svg"
            iconWidth={150}
            iconHeight={150}
            className="h-8 w-8"
          />
        </div>

        {/* Recent Searches Section */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col h-full">
          <div className="flex justify-between items-center border-b border-gray-200 pb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Recent Searches
            </h3>
            <div className="relative flex items-center space-x-4">
              {/* Dropdown Button */}
              <button
                className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg flex items-center shadow-sm hover:bg-green-600 hover:text-white"
                onClick={toggleDropdown}
              >
                <FaClock className="mr-2" />
                {selectedFilter} <FaChevronDown className="ml-2" />
              </button>

              {/* View All Button */}
              <button
                className="bg-gray-100 text-green-500 px-4 py-2 rounded-lg shadow-sm hover:bg-green-600 hover:text-white"
                onClick={handleViewAll}
              >
                View All
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 bg-white shadow-lg rounded-lg mt-2 w-40">
                  <ul className="py-2">
                    {[
                      "Today",
                      "Yesterday",
                      "This Week",
                      "Last Week",
                      "Last 3 Months",
                      "Last 6 Months",
                      "Last Year",
                    ].map((filter) => (
                      <li
                        key={filter}
                        onClick={() => handleFilterSelect(filter)}
                        className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                      >
                        {filter}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("user")}
                  >
                    User
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("recentSearch")}
                  >
                    Recent Search
                  </th>
                  <th
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("dateTime")}
                  >
                    Date & Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {tableData.map((data, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {data.user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.recentSearch}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {data.dateTime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;

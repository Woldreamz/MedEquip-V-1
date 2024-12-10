"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "@/app/(root)/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/ui/BreadCrumbs";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
// import { BASE_URL } from "@/api/base-url";
import Modal from "@/components/Modal"; // Import the Modal component
import { useRouter } from 'next/navigation';

const AllUsers = () => {
  const breadcrumbs = [
    { name: "Account", href: "/auth" },
    { name: "All Users", href: "/auth/all-users" },
  ];

  const router = useRouter();
  const [usersList, setusersList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  const handleOpenModal = (userId: number) => {
    setSelectedUser(userId);
    setShowModal(true);
  };

  const handleConfirm = () => {
    setResponse("Yes");
    setShowModal(false);
  };

  const handleCancel = () => {
    setResponse("No");
    setShowModal(false);
  };

  useEffect(() =>{
    const fetchUsers = async () => {
      try {
        const response = await fetch(`https://medequip-api.vercel.app/api/users`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
          }
        );
        if (!response.ok) throw new Error('Failed to fetch equipment', response.json);
        const data = await response.json();
        console.log(data);
        setusersList(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  },[]);

  useEffect(() => {
    const deleteUser = async () => {
      if (response === "Yes" && selectedUser !== null) {
        try {
          const res = await fetch(`https://medequip-api.vercel.app/api/users/${selectedUser}`,
            {
              method: 'DELETE',
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              },
            }
          );
          if (!res.ok) throw new Error('Failed to delete user', res.json);
          const data = await res.json();
          console.log(data);
          // setusersList((prev) => prev.filter((user) => user.id !== selectedUser));
        } catch (error) {
          console.error(error);
        }
      }
      
    };
    deleteUser();
  }, [response, selectedUser]);

  return (
    <div className="flex flex-col bg-gray-100 w-full lg:grid lg:grid-cols-[auto,1fr] min-h-screen text-gray-800">
      <Layout>
        <div className="hidden lg:block lg:w-1/4 bg-white shadow-lg">
          {/* Sidebar content */}
        </div>
        <Navbar />
      </Layout>

      <div className="flex-1 lg:ml-[25%] p-6 space-y-6 pt-20">
        <header className="flex justify-between items-center p-4 bg-white shadow-md">
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          <Link href="/auth">
            <button className="bg-gray-200 px-4 py-2 rounded-md text-gray-600 hover:bg-gray-300">
              Back
            </button>
          </Link>
        </header>

        <section className="mt-4 bg-white rounded-lg shadow-md p-4">
          <h3 className="text-base md:text-lg font-semibold text-gray-700 mb-4">
            All Users
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 md:p-4 text-xs md:text-sm">Name</th>
                  <th className="p-2 md:p-4 text-xs md:text-sm">Occupation</th>
                  <th className="p-2 md:p-4 text-xs md:text-sm">Location</th>
                  <th className="p-2 md:p-4 text-xs md:text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Table rows */}
                {usersList.map((user: { 
                  id: number; firstname: string; lastname: string; occupation: string; address: string 
                 }, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2 md:p-4 text-xs md:text-sm">
                      {user.firstname} {user.lastname}
                    </td>
                    <td className="p-2 md:p-4 text-xs md:text-sm">
                      {user.occupation}
                    </td>
                    <td className="p-2 md:p-4 text-xs md:text-sm">
                      {user.address}
                    </td>
                    <td className="p-2 md:p-4 flex space-x-2 text-xs md:text-sm">
                      <button 
                       onClick={() => router.push(`/auth/profile?id=${encodeURIComponent(user.id)}`)} 
                       className="flex items-center text-green-500 p-1 sm:p-2"
                      >
                        <FontAwesomeIcon icon={faEye as IconProp} className="h-4 w-4" />
                      </button>
                      <button 
                       onClick={() => {handleOpenModal(user.id);}} 
                       className="flex items-center text-red-500 p-1 sm:p-2"
                      >
                        <FontAwesomeIcon icon={faTrash as IconProp} className="h-4 w-4" />
                      </button>
                      <Modal
                        isOpen={showModal}
                        message="Are you sure you want to proceed?"
                        onConfirm={handleConfirm}
                        onCancel={handleCancel}
                      />
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </section>
      </div>

    </div>    
  );
};

export default AllUsers;

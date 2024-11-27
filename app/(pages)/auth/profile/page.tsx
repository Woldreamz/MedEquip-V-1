"use client";
import { useState, useEffect, ChangeEvent } from "react";
import Layout from "@/app/(root)/layout";
import Navbar from "@/components/Navbar";
import Breadcrumbs from "@/components/ui/BreadCrumbs";
import { useSearchParams, useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import Image from "next/image";

const UserDetailsPage = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");
  const [user, setUser] = useState({
    id: id,
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    role: "",
    createdAt: "",
    updatedAt: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  const breadcrumbs = [
    { name: "Account", href: "/auth" },
    { name: "All Users", href: "/auth/all-users" },
    { name: "User Profile", href: "/auth/profile" },
  ];

  const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setProfileImage(reader.result); // Store image as a base64 string
        }
      };
      reader.readAsDataURL(file);
    }
  };

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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `https://medequip-api.vercel.app/api/users/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          },
        );
        if (!response.ok)
          throw new Error("Failed to fetch User data", response.json);
        const data = await response.json();
        console.log(data);
        setUser(data);
        console.log(user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [id]);

  useEffect(() => {
    const deleteUser = async () => {
      if (response === "Yes" && selectedUser !== null) {
        try {
          const res = await fetch(
            `https://medequip-api.vercel.app/api/users/${selectedUser}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            },
          );
          if (!res.ok) throw new Error("Failed to delete user", res.json);
          const data = await res.json();
          console.log(data);
          router.back();
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
        <Navbar />
      </Layout>

      <div className="flex-1 lg:ml-[20%] p-6 space-y-6 pt-20">
        <header className="flex justify-between items-center p-4 bg-white shadow-md">
          <div>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
          </div>
          <button
            onClick={() => (window.location.href = "/auth/all-users")}
            className="bg-gray-200 px-4 py-2 rounded-md text-gray-600 hover:bg-gray-300"
          >
            Back
          </button>
        </header>

        <section className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            User Details
          </h3>

          <div className="flex flex-col items-center mb-6">
            <img
              src={
                profileImage ||
                "https://via.placeholder.com/150?text=Profile+Image"
              }
              alt="Profile"
              className="w-32 h-32 rounded-full border mb-4"
              width={32}
              height={32}
            />
            <label className="text-sm text-gray-600 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfileImageChange}
              />
              Upload Profile Picture
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600 mb-1">First Name</label>
              <input
                type="text"
                value={user.firstname}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Last Name</label>
              <input
                type="text"
                value={user.lastname}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Email Address</label>
              <input
                type="test"
                value={user.email}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Occupation</label>
              <input
                type="text"
                value="Gynecologist"
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Address</label>
              <input
                type="text"
                value="San Jose, California, USA"
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Phone Number</label>
              <input
                type="text"
                value={user.phone}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            <Modal
              isOpen={showModal}
              message="Are you sure you want to proceed?"
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
          </div>
        </section>

        {/* Delete User Button */}
        <div className="flex justify-end">
          <button
            onClick={() => {
              handleOpenModal(user.id);
            }}
            className="px-4 lg:px-6 py-2 lg:py-3 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Delete User
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;

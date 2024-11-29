"use client";

import { useState, useEffect } from "react";
import { EquipmentImageList } from "../../../../components/equipment/image/imageCollection";
import EquipmentDetail, { Details } from "../../../../components/equipment/forms/details";
import Layout from "../../../(root)/layout";
import Navbar from "../../../../components/Navbar";
import Button from "../../../../components/ui/Button";
// import shears from "../../../../public/Images/shears.png";
// import Modal from "../../../../components/Modal";
import UpdateEquipment from "../UpdateEquipment/page"; // Import UpdateEquipment component
import { useSearchParams } from "next/navigation";
import { BASE_URL } from "../../../../api/base-url";


export interface ExDetails {
  id: string | null
  name: string
  category: string
  description: string
  tags: string[]
  useCases: string
}

const EquipmentDetails = () => {
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");
  const [details, setDetails] = useState<ExDetails>({
    id: id,
    name: "",
    category: "",
    description: "",
    tags: [],
    useCases: "",
  });

  const [allImages, setAllImages] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  // Fetch equipment details
  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/equipment/${id}`);
        if (!response.ok) throw new Error("Failed to fetch equipment");
        const data = await response.json();
        setDetails(data);
        setAllImages(data.images);
      } catch (error: any) {
        console.log(error); //render this error in an error pop up if it still doesn't load
      }
    };

    fetchEquipment();
  }, [id]);

  // Close modal function
  const closeModal = () => {
    setShowUpdateModal(false);
  };

  // Save changes and close modal
  const handleSaveChanges = () => {
    // Simulate saving the updated data
    console.log("Changes saved!");
    setShowUpdateModal(false);
  };

  const data = [
    { src: "/shears.png", alt: "shears" },
    { src: "/shears.png", alt: "shears" },
    { src: "/shears.png", alt: "shears" },
  ];
  const detail: Details = {
    name: details.name,
    category: details.category,
    description: details.description,
    age: "19-35",
    gender: "Female",
    length: "15cm",
    width: "30cm",
    keywords: [...details.tags],
  };

  // console.log(allImages);

  return (
    <div className="relative flex bg-gray-100 flex-col lg:flex-row min-h-screen">
      <Layout>
        <div className="hidden md:block md:w-1/4 bg-white shadow-lg"></div>
        <Navbar />
      </Layout>

      {/* Main Content */}
      <div className="flex-1 lg:ml-[21%] p-6 space-y-6 pt-20">
        <section className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-row justify-between h-10 my-4">
            <h3 className="text-black text-lg pl-5 md:pl-[15%]">
              Equipment Details
            </h3>
            <div className="flex justify-between gap-4">
              <Button
                label="Edit"
                typeProperty="button"
                onClick={() => setShowUpdateModal(true)} // Open the update modal
              />
              <Button label="Delete" typeProperty="button" />
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <EquipmentDetail {...detail} />
            <EquipmentImageList
              list={allImages.length == 0 ? data : allImages}
            />
          </div>
        </section>
      </div>

      {/* Update Equipment Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={closeModal}
            >
              &times;
            </button>
            <UpdateEquipment
              equipment={details} // Pass current equipment details
              onClose={closeModal}
              onSave={handleSaveChanges} // Trigger save functionality
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EquipmentDetails;

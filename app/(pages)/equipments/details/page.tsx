"use client";
import { useState, useEffect } from "react";
import { EquipmentImageList } from "@/components/equipment/image/imageCollection";
import EquipmentDetail from "@/components/equipment/forms/details";
import Layout from "@/app/(root)/layout";
import Navbar from "@/components/Navbar";
import Button from "@/components/ui/Button";
import shears from "@/public/Images/shears.png";
import { useSearchParams, useRouter } from "next/navigation";
import Modal from '@/components/Modal';


const EquipmentDetails = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams?.get('id');
  const [details, setDetails] = useState({
    id: id,
    name: "",
    category: "",
    description: "",
    tags: [],
    useCases: ""
  });
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [selectedEquipment, setSelectedEquipment] = useState<number | null>(null);

  const handleOpenModal = (equipmentId: number) => {
    setSelectedEquipment(equipmentId);
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
        const response = await fetch(`https://medequip-api.vercel.app/api/equipment/${id}`);
        if (!response.ok) throw new Error('Failed to fetch equipment', response.json);
        const data = await response.json();
        console.log(data);
        setDetails(data);
        console.log(details);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  },[id]);

  useEffect(() => {
    const deleteUser = async () => {
      if (response === "Yes" && selectedEquipment !== null) {
        try {
          const res = await fetch(`https://medequip-api.vercel.app/api/equipment/${selectedEquipment}`,
            {
              method: 'DELETE',
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              },
            }
          );
          // if (!res.ok) throw new Error('Failed to delete user', res.json);
          // const data = await res.json();
          // console.log(data);
          router.back();
        } catch (error) {
          console.error(error);
        }
      }
      
    };
    deleteUser();
  }, [response, selectedEquipment]);
  

  const data = [
    { src: shears, alt: "shears" },
    { src: shears, alt: "shears" },
    { src: shears, alt: "shears" },
  ];
  const detail = {
    name: details.name,
    category: details.category,
    description:
      details.description,
    age: "19-35",
    gender: "Female",
    length: "15cm",
    width: "30cm",
    keywords: [details.tags],
  };

  return (
    <div className="flex bg-gray-100 flex-col lg:flex-row min-h-screen">
      <Layout>
        <div className="hidden md:block md:w-1/4 bg-white shadow-lg">
          {/* Sidebar content if needed */}
        </div>
        <Navbar />
      </Layout>

      {/* Main Content */}
      <div className="flex-1 lg:ml-[21%] p-6 space-y-6 pt-20">
        <section className="bg-white p-6 rounded-lg shadow-md">
          <div className='flex flex-row justify-between h-10 my-4'>
            <h3 className='text-black text-lg pl-5 md:pl-[15%]'>Equipment Details</h3>
            <div className='flex justify-between gap-4'>
                <Button label='Edit' otherStyles='' onClick={() => router.push(`/equipments/UpdateEquipment?id=${encodeURIComponent(details.id)}`)} typeProperty="button"/>
                <Button label='Delete'otherStyles='' onClick={() => {handleOpenModal(details.id)}} typeProperty="button" />
            </div>
            <Modal
              isOpen={showModal}
              message="Are you sure you want to proceed?"
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <EquipmentDetail {...detail} />
            <EquipmentImageList list={data} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default EquipmentDetails;

"use client";

import React from "react";
import Layout from "@/app/(root)/layout";
import EquipmentStepper from "@/components/EquipmentStepper";
import Navbar from "@/components/Navbar";

const BasicInformationPage = () => {
  return (
    <Layout>
      <div className="flex-1 lg:ml-[20%] p-6 space-y-6 pt-20">
        <Navbar />
        <EquipmentStepper />
      </div>
    </Layout>
  );
};

export default BasicInformationPage;

"use client";

import React, { FormEvent, useState } from "react";
import InputField from "../../../../components/ui/InputField";
import Button from "../../../../components/ui/Button";

interface FormState {
  name: string;
  description: string;
  category: string;
  image: File | string;
  tags: string[];
  useCases: string;
}

interface UpdateEquipmentProps {
  closeModal: () => void;
}

const UpdateEquipment: React.FC<UpdateEquipmentProps> = ({ closeModal }) => {
  const [tag, setTag] = useState<string[]>([]);
  const [form, setForm] = useState<FormState>({
    name: "",
    description: "",
    category: "",
    image: "",
    tags: [],
    useCases: "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = event.target;

    if (name === "tags") {
      const tagsArray = value.split(",").map((tag) => tag.trim());
      setTag(tagsArray);
      setForm({ ...form, tags: tagsArray });
    } else if (name === "image" && files && files.length > 0) {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("category", form.category);
    form.tags.forEach((tag) => formData.append("tags[]", tag));
    formData.append("useCases", form.useCases);

    if (form.image instanceof File) {
      formData.append("files", form.image);
    }

    try {
      const response = await fetch(
        `https://medequip-api.vercel.app/api/equipment/${form.name}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: formData,
        },
      );
      if (response.ok) {
        closeModal(); // Close the modal after a successful update
      } else {
        console.error("Error updating equipment");
        alert("Failed to update equipment");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="flex flex-col items-center py-8 px-8 bg-white rounded-[40px]">
      <h2 className="text-center text-2xl mb-4">Update Equipment</h2>
      <form className="w-full text-sm" onSubmit={handleSubmit}>
        <InputField
          type="text"
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <InputField
          type="text"
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <InputField
          type="text"
          label="Category"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          required
        />
        <InputField
          type="file"
          label="Image"
          name="image"
          onChange={handleChange}
        />
        <InputField
          type="text"
          label="Tags"
          name="tags"
          value={tag.join(",")}
          onChange={handleChange}
          placeholder="Tags (comma-separated)"
        />
        <InputField
          type="text"
          label="Use Cases"
          name="useCases"
          value={form.useCases}
          onChange={handleChange}
          placeholder="Use Cases"
          required
        />
        <div className="flex justify-between mt-4">
          <Button
            typeProperty="button"
            label="Cancel"
            onClick={closeModal}
            otherStyles="bg-red-500 text-white"
          />
          <Button typeProperty="submit" label="Save Changes" />
        </div>
      </form>
    </div>
  );
};

export default UpdateEquipment;

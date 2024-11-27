"use client";

import React, { useState } from "react";
import Image from "next/image";

interface FormState {
  name: string;
  description: string;
  category: string;
  image: File | string;
  tags: string[];
  useCases: string;
}

const steps = [
  { id: 1, title: "Basic Information" },
  { id: 2, title: "Equipment Description" },
  { id: 3, title: "Specifications" },
  { id: 4, title: "Upload Images" },
  { id: 5, title: "Keywords" },
  { id: 6, title: "Use Cases" },
  { id: 7, title: "Review" },
];

interface ProgressBarProps {
  currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      {steps.map((step) => (
        <div
          key={step.id}
          className={`flex-1 h-1 ${
            step.id <= currentStep ? "bg-green-500" : "bg-gray-300"
          }`}
        ></div>
      ))}
    </div>
  );
};

interface Specifications {
  [key: string]: string;
}

const EquipmentStepper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState([
    "Surgery",
    "Diagnostics",
    "Therapy",
  ]);
  const [description, setDescription] = useState("");
  const [specifications, setSpecifications] = useState<Specifications>({});
  const [keywords, setKeywords] = useState(["Surgery"]);
  const [newKeyword, setNewKeyword] = useState("");
  const [useCases, setUseCases] = useState(["Lorem ipsum dolor sit amet."]);
  const [newUseCase, setNewUseCase] = useState("");
  const [images, setImages] = useState([
    "/shears.png",
    "/stetoscope.png",
    "/chemobed.png",
  ]);
  const [tag, setTag] = useState<string[]>([]);
  const [form, setForm] = useState<FormState>({
    name: '',
    description: '',
    category: '',
    image: '',
    tags: [],
    useCases: ''
  });

  function handleChange(event:React.ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = event.target;
   

    if (name === 'tags') {
        const tagsArray = value.split(',').map((tag) => tag.trim());
        setTag(tagsArray); // Fix: directly set the array instead of using spread operator
        setForm({...form, tags: tagsArray});
    }else if (name === 'image' && files && files.length>0) {
        // const file = files[0];
        setForm({...form, image: files[0]});
    } else{
        setForm({...form, [name]: value }); 
    }
    console.log(form);
  }

  // Modal state for success/cancel
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState<"success" | "cancel">("success");

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  const handleAddKeyword = () => {
    if (newKeyword && !tag.includes(newKeyword)) {
      setKeywords([...tag, newKeyword]);
      setNewKeyword("");
    }
  };

  const handleAddUseCase = () => {
    if (newUseCase && !useCases.includes(newUseCase)) {
      setUseCases([...useCases, newUseCase]);
      setNewUseCase("");
    }
  };

  const handleSubmit = async () => {
    
    const formData = new FormData();

  // Append all form fields to FormData
  formData.append("name", form.name);
  formData.append("description", form.description);
  formData.append("category", form.category);
  // formData.append("tags", JSON.stringify(form.tags));
  form.tags.forEach((tag) => formData.append("tags[]", tag));
  formData.append("useCases", form.useCases);

  // Append the file (if any)
   if (form.image instanceof File) {
    formData.append("files", form.image);
   }
    console.log(formData);
    
    
    try {
        const response = await fetch('https://medequip-api.vercel.app/api/equipment/',{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
          body: formData,
        });
        if (response.ok) {
          //redirect to the email verification page after sucessfull submission
          const responseData = await response.json();
          console.log(responseData);
        }else {
          const errorData = await response.json();
          console.error("Error: Failed to submit the form", errorData);
          alert("Failed to create equipment");
        }
      } catch (error) {
        console.error("An error occured:", error);
      }
    
  }
  const handleCancel = () => {
    setModalMessage("Equipment submission canceled!");
    setModalType("cancel");
    setModalVisible(true);
  };

  const handleNext = () => {
    if (currentStep < steps.length) setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h1 className="text-lg font-semibold">Basic Information</h1>
            <label className="block">
              <span className="text-sm font-medium">Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter equipment name"
                className="w-full border-gray-300 rounded-md shadow-sm mt-1"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Category</span>
              <div className="flex gap-2 mt-1">
                <select
                  value={form.category}
                  onChange={handleChange}
                  name="category"
                  className="flex-1 border-gray-300 rounded-md shadow-sm"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="New category"
                  className="flex-1 border-gray-300 rounded-md shadow-sm"
                />
                <button
                  onClick={handleAddCategory}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow"
                >
                  Add
                </button>
              </div>
            </label>
          </div>
        );
      case 2:
        return (
          <div className="flex-1 lg:ml-[20%] p-6 pr-40 space-y-6 pt-20">
            <section className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
              <h1 className="text-lg font-semibold mb-4">
                Equipment Description
              </h1>
              <p className="text-gray-600 mb-6">
                Provide a detailed description of the equipment.
              </p>
              <textarea
                value={form.description}
                onChange={handleChange}
                name="description"
                placeholder="Enter description here..."
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                rows={6}
              />
              <div className="mt-6">
                <button
                  onClick={handleNext}
                  className="w-full bg-green-500 text-white py-2 rounded-lg shadow hover:bg-green-600"
                >
                  Next
                </button>
              </div>
            </section>
          </div>
        );
      case 3:
        return (
          <div className="flex-1 lg:ml-[20%] p-6 pr-40 space-y-6 pt-20">
            <section className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
              <h1 className="text-lg font-semibold mb-4">Specifications</h1>
              <p className="text-gray-600 mb-6">
                Add specifications for the equipment.
              </p>
              <div>
                <h2 className="text-xl font-bold mb-4">Specifications</h2>
                <button
                  onClick={() =>
                    setSpecifications({
                      ...specifications,
                      [`spec${Object.keys(specifications).length + 1}`]: "",
                    })
                  }
                  className="flex items-center space-x-2 bg-yellow-100 border-yellow-400 text-yellow-600 p-4 rounded-lg shadow"
                >
                  <span className="text-xl">+</span>
                  <span>Add Specification</span>
                </button>
              </div>
              <div className="mt-4 space-y-4">
                {Object.keys(specifications).map((key, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={specifications[key]}
                      onChange={(e) =>
                        setSpecifications({
                          ...specifications,
                          [key]: e.target.value,
                        })
                      }
                      className="border-gray-300 rounded-md shadow-sm"
                    />
                    <button
                      onClick={() =>
                        setSpecifications(
                          Object.keys(specifications)
                            .filter((spec) => spec !== key)
                            .reduce<Specifications>((obj, spec) => {
                              obj[spec] = specifications[spec];
                              return obj;
                            }, {}),
                        )
                      }
                      className="text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <button
                  onClick={handleNext}
                  className="w-full bg-green-500 text-white py-2 rounded-lg shadow hover:bg-green-600"
                >
                  Next
                </button>
              </div>
            </section>
          </div>
        );

      case 4:
        return (
          <div className="flex-1 lg:ml-[20%] p-6 pr-40 space-y-6 pt-20">
            <section className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
              <h1 className="text-lg font-semibold mb-4">Upload Images</h1>
              <p className="text-gray-600 mb-6">
                Upload clear images of the equipment.
              </p>
              <label className="block border-2 border-dashed border-gray-300 p-4 rounded-md cursor-pointer">
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files ? e.target.files[0] : null; // Check if files is not null
                    if (file) {
                      const imageURL = URL.createObjectURL(file);
                      setImages([...images, imageURL]);
                    }
                  }}
                  className="hidden"
                />

                <p className="text-gray-500 text-center">
                  Click to upload an image
                </p>
              </label>
              <ul className="mt-4 flex gap-4 overflow-x-auto">
                {images.map((image, index) => (
                  <li key={index} className="relative w-20 h-20">
                    <Image
                      src={image}
                      alt={`Uploaded ${index + 1}`}
                      width={80} // specify width
                      height={80} // specify height
                      className="w-full h-full object-cover rounded-md"
                    />
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <button
                  onClick={handleNext}
                  className="w-full bg-green-500 text-white py-2 rounded-lg shadow hover:bg-green-600"
                >
                  Next
                </button>
              </div>
            </section>
          </div>
        );

      case 5:
        return (
          <div className="flex-1 lg:ml-[20%] p-6 pr-40 space-y-6 pt-20">
            <section className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
              <h1 className="text-lg font-semibold mb-4">Keywords</h1>
              <p className="text-gray-600 mb-6">
                Add keywords to make the equipment easily searchable.
              </p>
              <div className="space-y-4">
                <input
                  type="text"
                  value={form.tags}
                  onChange={handleChange}
                  name="tags"
                  placeholder="Enter a keyword"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
                <button
                  onClick={handleAddKeyword}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600"
                >
                  Add
                </button>
              </div>
              <ul className="mt-4 flex gap-2 flex-wrap">
                {tag.map((keyword, index) => (
                  <li
                    key={index}
                    className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg text-sm"
                  >
                    {keyword}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <button
                  onClick={handleNext}
                  className="w-full bg-green-500 text-white py-2 rounded-lg shadow hover:bg-green-600"
                >
                  Next
                </button>
              </div>
            </section>
          </div>
        );

      case 6:
        return (
          <div className="flex-1 lg:ml-[20%] p-6 pr-40 space-y-6 pt-20">
            <section className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
              <h1 className="text-lg font-semibold mb-4">Use Cases</h1>
              <p className="text-gray-600 mb-6">
                List practical applications for the equipment.
              </p>
              <textarea
                value={form.useCases}
                onChange={handleChange}
                placeholder="Enter a use case"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                rows={3}
                name="useCases"
              />
              <button
                onClick={handleAddUseCase}
                className="w-full bg-yellow-500 text-white py-2 rounded-lg shadow hover:bg-yellow-600 mt-2"
              >
                Add Use Case
              </button>
              <ul className="mt-4 space-y-2">
                {useCases.map((useCase, index) => (
                  <li
                    key={index}
                    className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg text-sm"
                  >
                    {useCase}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <button
                  onClick={handleNext}
                  className="w-full bg-green-500 text-white py-2 rounded-lg shadow hover:bg-green-600"
                >
                  Next
                </button>
              </div>
            </section>
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Review Your Equipment</h2>
            <p>
              <strong>Name:</strong> {form.name}
            </p>
            <p>
              <strong>Category:</strong> {form.category}
            </p>
            <p>
              <strong>Description:</strong> {form.description}
            </p>
            <p>
              <strong>Specifications:</strong>
            </p>
            <ul>
              {Object.entries(specifications).map(([key, value]) => (
                <li key={key}>
                  {key}: {value}
                </li>
              ))}
            </ul>
            <p>
              <strong>Keywords:</strong> {keywords.join(", ")}
            </p>
            <p>
              <strong>Use Cases:</strong> {form.useCases}
            </p>
            <p>
              <strong>Uploaded Images:</strong>
            </p>
            <ul className="flex gap-4">
              {images.map((image, index) => (
                <li key={index} className="relative w-20 h-20">
                  <Image
                    src={image}
                    alt={`Uploaded ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover rounded-md"
                  />
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-4">
              <button
                onClick={handlePrevious}
                className="w-full bg-gray-400 text-white py-2 rounded-lg shadow hover:bg-gray-500"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="w-full bg-green-500 text-white py-2 rounded-lg shadow hover:bg-green-600"
              >
                Submit
              </button>
              <button
                onClick={handleCancel}
                className="w-full bg-red-500 text-white py-2 rounded-lg shadow hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <ProgressBar currentStep={currentStep} />
      {renderStepContent()}
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className={`px-6 py-2 rounded-lg ${
            currentStep === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EquipmentStepper;

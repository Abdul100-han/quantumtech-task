"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import exportImg from "../assets/export.png";
import Image from "next/image";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  occupation: z.string().min(1, "Occupation is required"),
  image: z.any().optional(),
});



export default function AccountForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(initialData?.image || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      firstName: "",
      lastName: "",
      occupation: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setValue("image", e.target.files); // Update form value
    }
  };

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("occupation", data.occupation);

      // Handle image upload if exists
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      const endpoint = initialData?.id
        ? `/api/accounts/${initialData.id}`
        : "/api/accounts";

      const response = await fetch(endpoint, {
        method: initialData?.id ? "PUT" : "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save account");
      }

      router.refresh();
      router.push("/accounts");
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Image Upload */}
<div className="text-center">
  <div 
    className="mx-auto relative w-24 h-24 rounded-full bg-gray-200 mb-4 overflow-hidden cursor-pointer border-2 border-dashed border-gray-400"
    onClick={() => fileInputRef.current?.click()}
  >
    {previewImage ? (
      <img 
        src={previewImage} 
        alt="Preview" 
        className="w-full h-full object-cover rounded-full"
      />
    ) : (
      <Image
        src={exportImg}
        alt="Upload placeholder"
        className="object-cover rounded-full"
        fill
        sizes="96px"
        style={{ objectFit: 'cover' }}
      />
    )}
  </div>

  <input
    type="file"
    ref={fileInputRef}
    className="hidden"
    accept="image/*"
    onChange={handleImageChange}
  />

  <p 
    className="text-sm text-green-600 hover:text-green-700 cursor-pointer"
    onClick={() => fileInputRef.current?.click()}
  >
    Click to upload image
  </p>
  <p className="text-xs text-gray-500">or drag and drop</p>
</div>


      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-2xl text-[#211F1F] mb-1">
            First Name*
          </label>
          <input
            placeholder="Enter first name"
            {...register("firstName")}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-base shadow-sm focus:border-green-500 focus:ring-green-500"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-2xl text-[#211F1F] mb-1">
            Last Name*
          </label>
          <input
            placeholder="Enter last name"
            {...register("lastName")}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-base shadow-sm focus:border-green-500 focus:ring-green-500"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-2xl text-[#211F1F] mb-1">
            Occupation*
          </label>
          <select
            {...register("occupation")}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-base shadow-sm focus:border-green-500 focus:ring-green-500"
          >
            <option value="">Select occupation</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
          {errors.occupation && (
            <p className="mt-1 text-sm text-red-600">
              {errors.occupation.message}
            </p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          className={`w-full max-w-md px-6 py-3 rounded-md text-white text-lg font-semibold ${
            isValid
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Saving...
            </span>
          ) : (
            "Save"
          )}
        </button>
      </div>

      {submitError && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md">
          {submitError}
        </div>
      )}
    </form>
  );
}

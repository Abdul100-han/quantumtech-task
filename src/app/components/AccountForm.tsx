'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import exportImg from "../assets/export.png"
import Image from 'next/image'

const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  occupation: z.string().min(1, 'Occupation is required'),
  image: z.any().optional()
})

export default function AccountForm({ initialData }: { initialData?: any }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      firstName: '',
      lastName: '',
      occupation: ''
    }
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData()
      formData.append('firstName', data.firstName)
      formData.append('lastName', data.lastName)
      if (data.occupation) formData.append('occupation', data.occupation)
      if (data.image) formData.append('image', data.image[0])
  
      const response = await fetch(
        initialData?.id ? `/api/accounts/${initialData.id}` : '/api/accounts',
        {
          method: initialData?.id ? 'PUT' : 'POST',
          body: formData
        }
      )
  
      if (!response.ok) {
        throw new Error('Failed to save account')
      }
  
      router.refresh()
      router.push('/accounts')
    } catch (error) {
      console.error('Submission error:', error)
      alert('Failed to save account. Check console for details.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Image Upload */}
      <div className="text-center">
        <label className="mx-auto relative w-24 h-24 rounded-full bg-gray-200 mb-4 overflow-hidden cursor-pointer block">
          {previewImage ? (
            <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <Image
                src={exportImg}
                alt="User avatar"
                className="rounded-full object-cover"
                width={96}
                height={96}
              />
            </div>
          )}
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>

        {/* Label for clickable text */}
        <label className="cursor-pointer">
          <p className="text-sm text-green-600 underline hover:text-green-700">
            Click image to upload
          </p>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
        <p>Or drag and drop it here</p>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-2xl text-[#211F1F] mb-1">First Name</label>
          <input
            placeholder="Enter first name"
            {...register('firstName')}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-base shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName.message as string}</p>
          )}
        </div>

        <div>
          <label className="block text-2xl text-[#211F1F] mb-1">Last Name</label>
          <input
            placeholder="Enter last name"
            {...register('lastName')}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-base shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName.message as string}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-2xl text-[#211F1F] mb-1">Occupation*</label>
          <select
            {...register('occupation')}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 text-base shadow-sm focus:border-green-500 focus:ring-green-500 focus:outline-none"
          >
            <option value="">Select occupation</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
          {errors.occupation && (
            <p className="mt-1 text-sm text-red-600">{errors.occupation.message as string}</p>
          )}
        </div>
      </div>

      <div className="flex justify-center">
  <button
    type="submit"
    disabled={!isValid || isSubmitting}
    className={`w-[417px] px-6 py-3 rounded-md text-white text-lg font-semibold ${
      isValid ? 'bg-green-600 hover:bg-green-700' : 'bg-[#B8E0C8] cursor-not-allowed'
    }`}
  >
    {isSubmitting ? 'Saving...' : 'Save'}
  </button>
</div>

    </form>
  )
}

'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { useToast } from '@/components/ui/use-toast'
import { nativeClient } from '@/lib/trpc/client'

export function LogoInput({
  clinicId,
  logo_url,
}: {
  clinicId: string
  logo_url?: string
}) {
  const { toast } = useToast()
  const router = useRouter()
  const [logo, setLogo] = useState(
    logo_url || 'https://via.placeholder.com/150',
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function uploadImage(file: File) {
    setIsSubmitting(true)

    const uploadUrlResponse = await nativeClient.requestUploadUrl.query({
      type: file.type as 'image/png' | 'image/jpeg',
      path: 'clinic',
    })

    await axios.put(uploadUrlResponse.url, file, {
      headers: {
        'Content-Type': file.type,
      },
    })

    await nativeClient.updateClinicLogo.mutate({
      clinicId,
      logo: uploadUrlResponse.file_name,
    })

    setIsSubmitting(false)

    toast({
      title: 'Logo atualizada com sucesso',
    })

    router.refresh()
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogo(reader.result as string)

        uploadImage(file)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <img src={logo} alt="Logo" className="mb-4 w-48 object-contain" />
      <label className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700">
        Alterar Logo
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
          disabled={isSubmitting}
        />
      </label>
    </div>
  )
}

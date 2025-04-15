import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    
    // Handle image upload
    let imagePath = ''
    const imageFile = formData.get('image') as File | null
    if (imageFile) {
      const bytes = await imageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const filename = `${Date.now()}-${imageFile.name}`
      const uploadDir = path.join(process.cwd(), 'public/uploads')
      await writeFile(path.join(uploadDir, filename), buffer)
      imagePath = `/uploads/${filename}`
    }

    const account = await prisma.account.create({
      data: {
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        occupation: formData.get('occupation') as string || null,
        image: imagePath || null
      }
    })

    return NextResponse.json(account)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
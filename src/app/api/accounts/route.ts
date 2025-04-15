import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const occupation = formData.get('occupation') as string
    const imageFile = formData.get('image') as File

    let imageBase64: string | null = null

    if (imageFile && imageFile instanceof File) {
      const buffer = Buffer.from(await imageFile.arrayBuffer())
      imageBase64 = `data:${imageFile.type};base64,${buffer.toString('base64')}`
    }

    const account = await prisma.account.create({
      data: {
        firstName,
        lastName,
        occupation,
        image: imageBase64,
      },
    })

    return NextResponse.json(account, { status: 201 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Account creation failed' },
      { status: 500 }
    )
  }
}

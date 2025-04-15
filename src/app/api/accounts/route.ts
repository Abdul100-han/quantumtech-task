import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    
    const account = await prisma.account.create({
      data: {
        firstName: formData.get('firstName') as string,
        lastName: formData.get('lastName') as string,
        occupation: formData.get('occupation') as string || null
      }
    })

    return NextResponse.json(account, { status: 201 })
  } catch (error) {
    console.error('Account creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    )
  }
}
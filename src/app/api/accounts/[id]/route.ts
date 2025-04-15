import { NextResponse } from 'next/server'
import db from '@/lib/db'
import { z } from 'zod'

const accountSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
})

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()
    const validation = accountSchema.safeParse(body)
    
    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 })
    }

    const account = await db.account.update({
      where: { id: params.id },
      data: validation.data
    })

    return NextResponse.json(account)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.account.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Account deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
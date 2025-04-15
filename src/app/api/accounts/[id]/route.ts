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
    const formData = await req.formData()

    const body = {
      firstName: formData.get('firstName')?.toString() || '',
      lastName: formData.get('lastName')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      phone: formData.get('phone')?.toString(),
      address: formData.get('address')?.toString(),
      city: formData.get('city')?.toString(),
      state: formData.get('state')?.toString(),
      postalCode: formData.get('postalCode')?.toString(),
      country: formData.get('country')?.toString(),
    }

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
    console.error('Update error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

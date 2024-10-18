import { connectToDatabase } from '@/db/mongodb'
import { NextResponse } from 'next/server'
import User from '../../../../models/User'
import { NextApiRequest, NextApiResponse } from 'next'

export async function GET() {
  try {
    await connectToDatabase()
    const topics = await User.find()

    return NextResponse.json({ topics })
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  if (req.method === 'POST') {
    const body = await req.json()
    const { nameLink, email, password, name, bio, image, lists, plans } = body

    console.log('Boody recebido!', {
      nameLink,
      email,
      password,
      plans
    })

    if (!nameLink || !email || !plans || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    try {
      await connectToDatabase()
      const newUser = await User.create({
        nameLink,
        email,
        password,
        name,
        bio,
        image,
        lists,
        plans
      })

      return NextResponse.json(
        { message: 'NameLink Created!!!', user: newUser },
        { status: 200 }
      )
    } catch (err: any) {
      console.error('Error creating/saving user:', err)
      return NextResponse.json(
        { message: 'Error creating user', error: err.message },
        { status: 500 }
      )
    }
  }
}

export async function PATCH(req: Request) {
  if (req.method === 'PATCH') {
    const body = await req.json()

    const { nameLink, name, bio, image, lists, plans } = body
    // console.log('Body recebido no PUT:', body)

    try {
      await connectToDatabase()

      const updatedUser = await User.findOneAndUpdate(
        { nameLink },
        {
          name,
          bio,
          image,
          lists,
          plans
        },
        { new: true }
      )
      // Verificar se a atualização foi bem-sucedida
      if (updatedUser.modifiedCount === 0) {
        return NextResponse.json({
          message: 'No changes made or user not found'
        })
      }
      return NextResponse.json(
        { message: 'User updated successfully', updatedUser },
        { status: 200 }
      )
    } catch (error: any) {
      console.error('Error updating user:', error)
      return NextResponse.json(
        { message: 'Error updating user', error: error.message },
        { status: 500 }
      )
    }
  }
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  console.log('ID API ==>', id)
  if (!id) {
    return res.status(400).json({ message: 'ID is missing' })
  }

  // await connectToDatabase()
  // await User.findByIdAndDelete(id)

  return NextResponse.json({ message: 'Top deleted!!!' })
}

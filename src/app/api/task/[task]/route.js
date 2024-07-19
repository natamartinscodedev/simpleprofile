import { connectToDatabase } from '@/db/mongodb'
import { NextResponse } from 'next/server'
import User from '../../../../models/User'

export async function POST(req) {
    try {
        const { nameLink, email, name, bio, image, lists, plans } = await req.json()

        if (!nameLink || !email || !plans) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
        }

        await connectToDatabase()
        try {
            const newUser = await User.create(
                {
                    nameLink,
                    email,
                    name,
                    bio,
                    image,
                    lists,
                    plans
                }
            )

            return NextResponse.json({ message: "NameLink Created!!!", user: newUser }, { status: 200 })
        } catch (err) {
            console.error("Error creating/saving user:", err)
            return NextResponse.json({ message: "Error creating user", error: err.message }, { status: 500 })
        }
    } catch (error) {
        console.error("Error in /api/session:", error)
        return NextResponse.error({ status: 500, body: "Internal Server Error" })
    }
}

export async function GET() {
    try {
        await connectToDatabase()
        const topics = await User.find()

        return NextResponse.json({ topics })
    } catch (error) {
        console.error("Error fetching tasks:", error)
        return NextResponse.error({ status: 500, body: "Internal Server Error" })
    }
}

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get("id")

    await connectToDatabase()
    await User.findByIdAndDelete(id)

    return NextResponse.json({ message: "Top deleted!!!" }, { status: 200 })
}

export async function PUT(req) {
    try {
        const { nameLink, email, name, bio, image, lists, plans } = await req.json()

        await connectToDatabase()
        const updatedUser = await User.updateOne(
            { nameLink }, // Filtro para encontrar o usuário
            {
                $set: {
                    email,
                    name,
                    bio,
                    image,
                    lists,
                    plans
                }
            }
        )
        // Verificar se a atualização foi bem-sucedida
        if (updatedUser.modifiedCount === 0) {
            return NextResponse.json({ message: "No changes made or user not found" }, { status: 404 })
        }

        return NextResponse.json({ message: "User updated successfully", userUpdate: updatedUser }, { status: 200 })

    } catch (error) {
        console.error("Error updating user:", error)
        return NextResponse.json({ message: "Error updating user", error: error.message }, { status: 500 })
    }
}


import { ConnectToDatabase } from '@/db/mongodb'
import { NextResponse } from 'next/server';
import User from '@/models/Users'

export async function POST(req) {
    try {
        const {
            nameLink,
            email,
            name,
            bio,
            image,
            lists

        } = await req.json()

        await ConnectToDatabase()
        await User.create(
            {
                nameLink,
                email,
                name,
                bio,
                image,
                lists
            }
        )

        return NextResponse.json({ message: "NameLink Created!!!" }, { status: 200 })
    } catch (error) {
        console.error("Error in /api/session:", error);
        return NextResponse.error({ status: 500, body: "Internal Server Error" });
    }
}

export async function GET() {
    try {
        await ConnectToDatabase();
        const topics = await User.find();

        return NextResponse.json({ topics });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return NextResponse.error({ status: 500, body: "Internal Server Error" });
    }
}

// export async function DELETE(req) {
//     const id = req.nextUrl.searchParams.get("id")

//     await connectToDatabase();
//     await User.findByIdAndDelete(id);

//     return NextResponse.json({ message: "Top deleted!!!" }, { status: 200 });
// } 


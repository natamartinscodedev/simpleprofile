import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/db/mongodb';
import TaskSchema from '@/models/Users';

export async function POST(req) {
    try {
        const {
            nameLink,
            email,
            name,
            bio,
            image,
            lists,
            plans
        } = await req.json();

        await connectToDatabase();
        await TaskSchema.create({
            nameLink,
            email,
            name,
            bio,
            image,
            lists,
            plans
        });

        return NextResponse.json({ message: "NameLink Created!!!" }, { status: 200 });
    } catch (error) {
        console.error("Error in /api/task POST:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
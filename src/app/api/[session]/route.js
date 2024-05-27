// pages/api/task.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/config/mongodb';
import TaskSchema from '@/models/Task';

export async function POST(req) {
    try {
        const {
            nameLink,
            email,
            name,
            bio,
            image,
            lists
        } = await req.json();   

        await connectToDatabase();
        await TaskSchema.create({
            nameLink,
            email,
            name,
            bio,
            image,
            lists
        });

        return NextResponse.json({ message: "NameLink Created!!!" }, { status: 200 });
    } catch (error) {
        console.error("Error in /api/task POST:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectToDatabase();
        const tasks = await TaskSchema.find();

        return NextResponse.json({ tasks }, { status: 200 });
    } catch (error) {
        console.error("Error in /api/task GET:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const id = req.nextUrl.searchParams.get("id");

        await connectToDatabase();
        await TaskSchema.findByIdAndDelete(id);

        return NextResponse.json({ message: "Task deleted!!!" }, { status: 200 });
    } catch (error) {
        console.error("Error in /api/task DELETE:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

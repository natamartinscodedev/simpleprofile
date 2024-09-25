import { connectToDatabase } from "@/db/mongodb";
import { NextResponse } from "next/server";
import User from "../../../../models/User";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: any) {
  try {
    if (req.method === "POST") {
      const { nameLink, email, name, bio, image, lists, plans } = req.body;

      if (!nameLink || !email || !plans) {
        return NextResponse.json(
          { message: "Missing required fields" },
          { status: 400 }
        );
      }

      await connectToDatabase();
      try {
        const newUser = await User.create({
          nameLink,
          email,
          name,
          bio,
          image,
          lists,
          plans,
        });

        return NextResponse.json(
          { message: "NameLink Created!!!", user: newUser },
          { status: 200 }
        );
      } catch (err: any) {
        console.error("Error creating/saving user:", err);
        return NextResponse.json(
          { message: "Error creating user", error: err.message },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    console.error("Error in /api/session:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const topics = await User.find();

    return NextResponse.json({ topics });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: any, res: any) {
  const { id } = req.query;

  console.log("ID API ==>", id);
  if (!id) {
    return res.status(400).json({ message: "ID is missing" });
  }

  // await connectToDatabase()
  // await User.findByIdAndDelete(id)

  return NextResponse.json({ message: "Top deleted!!!" });
}

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "PUT") {
      const { nameLink, name, bio, image, lists, plans } = req.body;
      console.log("PUT ==>", req.body);

      console.log("Body recebido no PUT:", {
        name: name,
        bio: bio,
        image: image,
        plans: plans,
      });

      // const nameLink = "Naytham";

      await connectToDatabase();

      const updatedUser = await User.updateOne(
        { nameLink: nameLink }, // Filtro para encontrar o usuário
        {
          $set: {
            // email: email,
            name: name,
            bio: "🐺Don't think just do it'1%",
            image: image,
            lists: lists,
            plans: plans,
          },
        }
      );
      // Verificar se a atualização foi bem-sucedida
      if (updatedUser.modifiedCount === 0) {
        return NextResponse.json({
          message: "No changes made or user not found",
        });
      }
      return NextResponse.json(
        { message: "User updated successfully", userUpdate: updatedUser },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Error updating user", error: error.message },
      { status: 500 }
    );
  }
}

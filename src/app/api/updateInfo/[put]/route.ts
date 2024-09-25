import { connectToDatabase } from "@/db/mongodb";
import { NextResponse } from "next/server";
import User from "../../../../models/User";
import { NextApiRequest } from "next";

export async function PUT(req: NextApiRequest, res: any) {
  try {
    if (req.method === "PUT") {
      const { name, bio, image, lists, plans } = req.body;
      console.log("REQ.Body ==>", req);

      console.log("Body recebido no PUT:", {
        name,
        bio,
        image,
        plans,
      });

      const nameLink = "Naytham";

      await connectToDatabase();

      const updatedUser = await User.updateOne(
        { nameLink }, // Filtro para encontrar o usuário
        {
          $set: {
            // email: email,
            name,
            bio: "🐺Don't think just do it1%",
            image,
            lists,
            plans,
          },
        },
        { upsert: true }
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

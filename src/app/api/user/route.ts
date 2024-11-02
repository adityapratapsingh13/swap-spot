// import { connectMongoDB } from "@/app/lib/db";
// import User from "../../models/user";
// import { NextResponse } from "next/server";

// interface UserRequest {
//   name: string;
//   email: string;
// }

// export async function POST(request: Request) {
//   try {
//     const { name, email }: UserRequest = await request.json();

//     await connectMongoDB();

//     const newUser = new User({
//       name,
//       email,
//     });

//     await newUser.save();

//     return NextResponse.json(newUser, { status: 201 });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     return NextResponse.json(
//       { error: "Failed to create user" },
//       { status: 500 }
//     );
//   }
// }

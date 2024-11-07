import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { buyerId, sellerId, productId } = await req.json();

  try {
    const chat = await prisma.chat.create({
      data: {
        buyerId,
        sellerId,
        productId,
      },
    });
    return NextResponse.json(chat);
  } catch (error) {
    console.error("Error creating chat:", error);
    return NextResponse.json(
      { error: "Failed to create chat" },
      { status: 500 }
    );
  }
}

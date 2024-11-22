import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  return NextResponse.json({
    msg: "Hi",
  });
}

export async function POST(req: NextRequest) {
  const { id } = await req.json();

  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product details:", error);
    return NextResponse.json(
      { message: "Error fetching product details", error },
      { status: 500 }
    );
  }
}

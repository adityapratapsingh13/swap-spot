// app/api/products/[id]/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Adjust the import path as necessary

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const product = await prisma.product.findUnique({
      where: { id: String(id) },
      // No include statement for images since it's a String[] in your schema
    });

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product details:', error);
    return NextResponse.json({ message: 'Error fetching product details', error }, { status: 500 });
  }
}

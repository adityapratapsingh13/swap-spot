import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const { chatId, senderId, content } = await req.json();

  try {
    const message = await prisma.message.create({
      data: {
        chatId,
        senderId,
        content,
      },
    });
    return NextResponse.json(message);
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}

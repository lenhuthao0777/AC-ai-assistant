import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/prisma';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  try {
    const user = await db.user.findUnique({
      where: { email },
    });

    if (user) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }

    const hashPass = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        email,
        password: hashPass,
      },
    });

    return NextResponse.json('SinUp success!', { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

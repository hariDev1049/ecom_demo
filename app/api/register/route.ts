import dbConnect from '@/lib/dbConnect';
import User from '@/lib/models/UserModel';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { username, email, password } = await req.json();

    const userExist = await User.findOne({ $or: [{ email }, { username }] });
    if (userExist) {
      return NextResponse.json(
        { message: 'User already Exist' },
        { status: 500 }
      );
    }

    const hashedPw = await bcrypt.hash(password, 10);

    await User.create({ name: username, email, password: hashedPw });
    return NextResponse.json({ message: 'User registered' }, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Couldn't register the user" },
      { status: 400 }
    );
  }
}

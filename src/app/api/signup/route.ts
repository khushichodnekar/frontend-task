import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function POST(req: Request) {
  try {
    const newUser = await req.json();
    const filePath = path.join(process.cwd(), 'public', 'users.json');

    let users = [];
    try {
      const fileData = await fs.readFile(filePath, 'utf-8');
      users = JSON.parse(fileData);
    } catch (e) {
      console.warn("users.json not found. Creating a new one.");
    }

    const emailExists = users.some((user: any) => user.email === newUser.email);
    if (emailExists) {
      return NextResponse.json({ error: "Email already exists!" }, { status: 400 });
    }

    users.push(newUser);

    await fs.writeFile(filePath, JSON.stringify(users, null, 2));

    return NextResponse.json({ message: "Signup successful!" }, { status: 200 });
  } catch (error) {
    console.error("Error in signup:", error);
    return NextResponse.json({ error: "Signup failed." }, { status: 500 });
  }
}

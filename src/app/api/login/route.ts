import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function POST(req: Request) {
  try {
    const credentials = await req.json();
    const filePath = path.join(process.cwd(), 'public', 'users.json');

    const fileData = await fs.readFile(filePath, 'utf-8');
    const users = JSON.parse(fileData);

    const user = users.find(
      (u: any) => u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      return NextResponse.json({ message: 'Login successful' });
    } else {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}

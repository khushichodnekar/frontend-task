import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'users.json');
    const data = await fs.readFile(filePath, 'utf8');
    const users = JSON.parse(data);
    return NextResponse.json(users);
  } catch (error) {
    console.error('Failed to read users.json:', error);
    return NextResponse.json([], { status: 500 });
  }
}

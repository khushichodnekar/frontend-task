import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const filePath = path.join(process.cwd(), 'src', 'data', 'users.json');

    const fileData = await fs.readFile(filePath, 'utf8');
    let users = JSON.parse(fileData);

    
    users = users.filter(
      (user: any) =>
        !(
          user.provider === data.provider &&
          user.model === data.model &&
          user.language === data.language
        )
    );

    // Write back updated data
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const body = await req.json();
const incomingData = {
  ...body,
  timestamp: new Date().toISOString(),
};


    const filePath = path.join(process.cwd(), 'src', 'data', 'users.json');

    // Read existing data
    let users = [];
    try {
      const fileData = await fs.readFile(filePath, 'utf8');
      users = JSON.parse(fileData);
    } catch (e) {
      console.warn("users.json not found or empty, creating new file.");
    }

    // ✅ Check for duplicate
    const isDuplicate = users.some(
      (user) =>
        user.provider === incomingData.provider &&
        user.model === incomingData.model &&
        user.language === incomingData.language
    );

    if (isDuplicate) {
      return NextResponse.json({ error: 'Duplicate entry!' }, { status: 400 });
    }

    // Append new data
    users.push(incomingData);

    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));

    return NextResponse.json({ message: 'Data saved successfully' });
  } catch (err) {
    console.error("Error saving data:", err);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}

// app/api/updateUser/route.ts

import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  const { email, password, originalEmail } = await request.json();

  const filePath = path.join(process.cwd(), "public", "users.json");

  try {
    const data = await fs.readFile(filePath, "utf-8");
    const users = JSON.parse(data);

    const updatedUsers = users.map((user: any) =>
      user.email === originalEmail
        ? { ...user, email, password }
        : user
    );

    await fs.writeFile(filePath, JSON.stringify(updatedUsers, null, 2));

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: err });
  }
}

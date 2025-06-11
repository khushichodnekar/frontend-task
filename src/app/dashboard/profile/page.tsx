"use client";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const loggedInEmail = localStorage.getItem("email");
    if (!loggedInEmail) return;

    fetch("/users.json")
      .then((res) => res.json())
      .then((data) => {
        const foundUser = data.find((u: any) => u.email === loggedInEmail);
        if (foundUser) {
          setUser(foundUser);
          setEmail(foundUser.email);
          setPassword(foundUser.password);
        }
      });
  }, []);

  const handleUpdate = async () => {
    const res = await fetch("/api/updateUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        originalEmail: user.email,
      }),
    });

    if (res.ok) {
      alert("Profile updated successfully!");
      localStorage.setItem("email", email); // update localStorage too
    } else {
      alert("Failed to update profile.");
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Your Profile</h1>

      <div>
        <label className="block font-medium mb-1">Username:</label>
        <p className="bg-gray-100 dark:bg-gray-800 p-2 rounded">{user.username}</p>
      </div>

      <div>
        <label className="block font-medium mb-1">Phone Number:</label>
        <p className="bg-gray-100 dark:bg-gray-800 p-2 rounded">{user.phone || "—"}</p>
      </div>

      <div>
        <label className="block font-medium mb-1">Email:</label>
        <input
          className="border p-2 w-full rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Password:</label>
        <input
          type="password"
          className="border p-2 w-full rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleUpdate}
      >
        Update Profile
      </button>
    </div>
  );
}

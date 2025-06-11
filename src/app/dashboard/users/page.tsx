'use client';
import { useState, useEffect } from 'react';

interface UserData {
  provider: string;
  model: string;
  language: string;
  timestamp?: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [filtered, setFiltered] = useState<UserData[]>([]);
  const [filter, setFilter] = useState({ provider: '', model: '', language: '' });

  useEffect(() => {
    fetch('/api/getUsers')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setFiltered(data);
      });
  }, []);

  const handleDelete = async (user: UserData) => {
    const res = await fetch('/api/delete', {
      method: 'POST',
      body: JSON.stringify(user),
    });

    if (res.ok) {
      const updated = users.filter(
        u =>
          !(
            u.provider === user.provider &&
            u.model === user.model &&
            u.language === user.language
          )
      );
      setUsers(updated);
      applyFilters(updated);
    }
  };

  const handleFilterChange = (field: keyof typeof filter, value: string) => {
    const updatedFilter = { ...filter, [field]: value };
    setFilter(updatedFilter);
    applyFilters(users, updatedFilter);
  };

  const applyFilters = (data: UserData[], activeFilter = filter) => {
    const filteredData = data.filter(user =>
      user.provider.toLowerCase().includes(activeFilter.provider.toLowerCase()) &&
      user.model.toLowerCase().includes(activeFilter.model.toLowerCase()) &&
      user.language.toLowerCase().includes(activeFilter.language.toLowerCase())
    );
    setFiltered(filteredData);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Saved User Selections</h1>

      {/* Filter Inputs */}
      <div className="mb-4 flex gap-4">
        <input
          className="border p-2"
          placeholder="Filter by Provider"
          value={filter.provider}
          onChange={(e) => handleFilterChange('provider', e.target.value)}
        />
        <input
          className="border p-2"
          placeholder="Filter by Model"
          value={filter.model}
          onChange={(e) => handleFilterChange('model', e.target.value)}
        />
        <input
          className="border p-2"
          placeholder="Filter by Language"
          value={filter.language}
          onChange={(e) => handleFilterChange('language', e.target.value)}
        />
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200 text-center">
            <th className="border p-2">Provider</th>
            <th className="border p-2">Model</th>
            <th className="border p-2">Language</th>
            <th className="border p-2">Timestamp</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((user, index) => (
            <tr key={index} className="text-center">
              <td className="border p-2">{user.provider}</td>
              <td className="border p-2">{user.model}</td>
              <td className="border p-2">{user.language}</td>
              <td className="border p-2">{user.timestamp || "—"}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(user)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

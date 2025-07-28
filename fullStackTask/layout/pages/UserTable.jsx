import React, { useState } from 'react';

function UserTable({ users, stores }) {
  let [sortField, setSortField] = useState('name');
  let [sortAsc, setSortAsc] = useState(true);
  let [filterText, setFilterText] = useState('');

  // Sort users based on selected field
  let sortedUsers = [...users].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortAsc ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortAsc ? 1 : -1;
    return 0;
  });

  // Filter by name, email, or role
  if (filterText) {
    sortedUsers = sortedUsers.filter(u =>
      u.name.toLowerCase().includes(filterText.toLowerCase()) ||
      u.email.toLowerCase().includes(filterText.toLowerCase()) ||
      u.role.toLowerCase().includes(filterText.toLowerCase())
    );
  }

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  return (
    <div>
      <input
        className="border p-2 mb-2 w-full"
        placeholder="Filter by name, email, or role"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr>
            <th onClick={() => handleSort('name')} className="cursor-pointer">Name</th>
            <th onClick={() => handleSort('email')} className="cursor-pointer">Email</th>
            <th>Address</th>
            <th onClick={() => handleSort('role')} className="cursor-pointer">Role</th>
            <th>Store Rating</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => {
            // If user is store owner, show their store's average rating
            let ownerRating = '';
            if (user.role === 'Owner') {
              // Find the store owned by this user
              let store = stores.find(s => s.email === user.email);
              if (store) {
                let avg = 0;
                if (store.ratings && store.ratings.length > 0) {
                  avg = store.ratings.reduce((a, b) => a + b) / store.ratings.length;
                }
                ownerRating = avg.toFixed(2);
              }
            }
            return (
              <tr key={user.id} className="border-t">
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.role}</td>
                <td>{ownerRating}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;

import React, { useState } from 'react';
import AddUserForm from './AddUserForm';
import UserTable from './UserTable';
import StoreTable from './StoreTable';

function AdminPage() {
  // Initial dummy data for users and stores
  let [users, setUsers] = useState([
    { id: 1, name: 'Administrator', email: 'admin@example.com', address: '123 Admin Lane', password: 'Admin@123', role: 'Admin' },
    { id: 2, name: 'John Doe NormalUser', email: 'john@example.com', address: '45 User St', password: 'User@1234', role: 'User' },
    { id: 3, name: 'Jane Smith StoreOwner', email: 'jane@store.com', address: '78 Store Ave', password: 'Owner@123', role: 'Owner' }
  ]);
  let [stores, setStores] = useState([
    { id: 1, name: 'Jane\'s Store', email: 'jane@store.com', address: '78 Store Ave', ratings: [4, 5, 3] }
  ]);
  let [ratings, setRatings] = useState([
    { userId: 2, storeId: 1, rating: 4 },
    { userId: 2, storeId: 1, rating: 5 },
    { userId: 3, storeId: 1, rating: 3 }
  ]);

  // Compute totals
  const totalUsers = users.length;
  const totalStores = stores.length;
  const totalRatings = ratings.length;

  // Handler to add new user
  const handleAddUser = (newUser) => {
    setUsers([...users, { id: users.length + 1, ...newUser }]);
  };

  return (
    <div className="space-y-8">
      {/* Dashboard Metrics */}
      <div className="flex space-x-4">
        <div className="bg-blue-100 p-4 rounded">Total Users: {totalUsers}</div>
        <div className="bg-green-100 p-4 rounded">Total Stores: {totalStores}</div>
        <div className="bg-yellow-100 p-4 rounded">Total Ratings: {totalRatings}</div>
      </div>

      {/* Add User Form */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-2">Add New User</h2>
        <AddUserForm onAddUser={handleAddUser} />
      </div>

      {/* User List Table */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-2">User List</h2>
        <UserTable users={users} stores={stores} />
      </div>

      {/* Store List Table */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-2">Store List</h2>
        <StoreTable stores={stores} />
      </div>
    </div>
  );
}

export default AdminPage;

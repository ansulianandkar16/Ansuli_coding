import React, { useState } from 'react';

function StoreTable({ stores }) {
  let [sortField, setSortField] = useState('name');
  let [sortAsc, setSortAsc] = useState(true);
  let [filterText, setFilterText] = useState('');

  let sortedStores = [...stores].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortAsc ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortAsc ? 1 : -1;
    return 0;
  });

  if (filterText) {
    sortedStores = sortedStores.filter(s =>
      s.name.toLowerCase().includes(filterText.toLowerCase()) ||
      s.address.toLowerCase().includes(filterText.toLowerCase())
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
        placeholder="Filter by name or address"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr>
            <th onClick={() => handleSort('name')} className="cursor-pointer">Name</th>
            <th onClick={() => handleSort('address')} className="cursor-pointer">Address</th>
            <th>Overall Rating</th>
          </tr>
        </thead>
        <tbody>
          {sortedStores.map((store) => {
            // Compute average rating
            let avg = '';
            if (store.ratings && store.ratings.length > 0) {
              avg = (store.ratings.reduce((a, b) => a + b) / store.ratings.length).toFixed(2);
            }
            return (
              <tr key={store.id} className="border-t">
                <td>{store.name}</td>
                <td>{store.address}</td>
                <td>{avg}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default StoreTable;

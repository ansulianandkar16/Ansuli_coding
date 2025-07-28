import React, { useState, useEffect } from 'react';
import RatingForm from './RatingForm';


function UserPage({ session }) {
  
  if (!session || session.role !== 'User') {
    return <div className="text-center mt-10">Please <a className="text-blue-500 underline" href="/login">login</a> as a normal user.</div>;
  }

  // Dummy data for stores and ratings
  let [stores, setStores] = useState([
    { id: 1, name: 'Jane\'s Store', address: '78 Store Ave', ratings: [4, 5, 3] },
    { id: 2, name: 'Coffee Corner', address: '12 Bean Blvd', ratings: [5, 4] }
  ]);
  let [userRatings, setUserRatings] = useState([
    { storeId: 1, rating: 4 },
    { storeId: 2, rating: 5 }
  ]);

  // Compute average rating for display
  const getAverage = (store) => {
    if (!store.ratings || store.ratings.length === 0) return '';
    return (store.ratings.reduce((a, b) => a + b) / store.ratings.length).toFixed(2);
  };

  
  const handleRating = (storeId, rating) => {
    // Update store's ratings
    setStores(prevStores => prevStores.map(s => {
      if (s.id === storeId) {
        // If user has already rated, replace; else add
        const hasRated = userRatings.some(ur => ur.storeId === storeId);
        let newRatings = [...s.ratings];
        if (hasRated) {
          // replace user's old rating (simplified)
          newRatings[newRatings.length - 1] = rating; 
        } else {
          newRatings.push(rating);
        }
        return { ...s, ratings: newRatings };
      }
      return s;
    }));
    // Update userRatings
    setUserRatings(prev => {
      const exists = prev.find(ur => ur.storeId === storeId);
      if (exists) {
        return prev.map(ur => ur.storeId === storeId ? { storeId, rating } : ur);
      } else {
        return [...prev, { storeId, rating }];
      }
    });
  };

  // Filtering state
  let [filterText, setFilterText] = useState('');

  // Filtered store list
  let filteredStores = stores.filter(s =>
    s.name.toLowerCase().includes(filterText.toLowerCase()) ||
    s.address.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Welcome, {session.user.name}</h2>
      <div className="mb-4">
        <input
          className="border p-2 w-full"
          placeholder="Search stores by name or address"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
      </div>
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Store Name</th>
            <th className="p-2">Address</th>
            <th className="p-2">Avg Rating</th>
            <th className="p-2">Your Rating</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredStores.map((store) => {
            const userRatingObj = userRatings.find(ur => ur.storeId === store.id);
            return (
              <tr key={store.id} className="border-t">
                <td className="p-2">{store.name}</td>
                <td className="p-2">{store.address}</td>
                <td className="p-2">{getAverage(store)}</td>
                <td className="p-2">{userRatingObj ? userRatingObj.rating : '-'}</td>
                <td className="p-2">
                  <RatingForm storeId={store.id} onRate={handleRating} existingRating={userRatingObj ? userRatingObj.rating : null} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UserPage;

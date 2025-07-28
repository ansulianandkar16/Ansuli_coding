import React from 'react';

function OwnerPage({ session }) {
  
  if (!session || session.role !== 'Owner') {
    return <div className="text-center mt-10">Please <a className="text-blue-500 underline" href="/login">login</a> as a store owner.</div>;
  }

  // Dummy store and ratings data linked by owner's email
  const store = {
    id: 1,
    name: "Jane's Store",
    ownerEmail: session.user.email,
    ratings: [
      { userName: "John Doe", rating: 4 },
      { userName: "John Doe", rating: 5 },
      { userName: "Jane StoreOwner", rating: 3 }
    ]
  };

  // Compute average rating
  const avgRating = (store.ratings.reduce((acc, r) => acc + r.rating, 0) / store.ratings.length).toFixed(2);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Store Owner Dashboard</h2>
      <div className="mb-4">
        <p><strong>Store:</strong> {store.name}</p>
        <p><strong>Average Rating:</strong> {avgRating}</p>
      </div>
      <h3 className="text-xl mb-2">User Ratings</h3>
      <table className="table-auto w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">User Name</th>
            <th className="p-2">Rating</th>
          </tr>
        </thead>
        <tbody>
          {store.ratings.map((r, idx) => (
            <tr key={idx} className="border-t">
              <td className="p-2">{r.userName}</td>
              <td className="p-2">{r.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OwnerPage;

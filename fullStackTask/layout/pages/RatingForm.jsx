import React, { useState } from 'react';

function RatingForm({ storeId, existingRating, onRate }) {
  let [rating, setRating] = useState(existingRating || 1);
  const isEdit = existingRating !== null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onRate(storeId, rating);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <select 
        className="border p-1"
        value={rating}
        onChange={(e) => setRating(parseInt(e.target.value))}
      >
        {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
      </select>
      <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded">
        {isEdit ? 'Update' : 'Submit'}
      </button>
    </form>
  );
}

export default RatingForm;

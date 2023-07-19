// AddItem.js
import React, { useState } from 'react';

const AddItem = () => {
  const [itemName, setItemName] = useState('');

  const handleAddItem = (e) => {
    e.preventDefault();
    // Implement add item functionality
  };

  return (
    <form onSubmit={handleAddItem}>
      <label htmlFor="name">
        Item Name:
        <input
          id="name"
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
        />
      </label>
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItem;

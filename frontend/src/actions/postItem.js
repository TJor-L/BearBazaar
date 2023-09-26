import React, {useContext, useState} from 'react';
import UserContext from '../contexts/userContext';

function PostItem({onClose}) {
  const {userID} = useContext(UserContext);

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState(null);

  async function handleNewItem() {
    // Check if all fields are filled
    if (!id || !name || !description || !category || !status || !price) {
      setError('All fields are required!');
      return;
    }

    const response = await fetch('http://localhost:8080/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: Number(id),
        owner: userID, // use the owner from context
        name: name,
        description: description,
        category: category,
        status: status,
        price: Number(price),
      }),
    });

    if (response.ok) {
      onClose();
    } else {
      const data = await response.json();
      setError(data.message || 'An error occurred while adding the item.');
    }
  }

  return (
      <div className="post-item">
        {error && <p className="error">{error}</p>}
        <button onClick={onClose}>close</button>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)}
               placeholder="Item ID"/>
        <input type="text" value={name}
               onChange={(e) => setName(e.target.value)} placeholder="Name"/>
        <input type="text" value={description}
               onChange={(e) => setDescription(e.target.value)}
               placeholder="Description"/>
        <input type="text" value={category}
               onChange={(e) => setCategory(e.target.value)}
               placeholder="Category"/>
        <input type="text" value={status}
               onChange={(e) => setStatus(e.target.value)}
               placeholder="Status"/>
        <input type="text" value={price}
               onChange={(e) => setPrice(e.target.value)} placeholder="Price"/>
        <button onClick={handleNewItem}>Add Item</button>
      </div>
  );
}

export default PostItem;
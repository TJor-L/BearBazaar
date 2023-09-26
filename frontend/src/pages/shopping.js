import React, {useEffect, useState} from 'react';

function ShoppingPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:8080/items');
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || 'Network response was not ok');
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.log('There was a problem with the fetch operation:',
            error.message);
      }
    };

    fetchItems();
  }, []);

  return (
      <div>
        <ul>
          {items.map(item => (
              <li key={item.id}>
                <strong>Name:</strong> {item.name} <br/>
                <strong>Owner:</strong> {item.owner} <br/>
                <strong>Description:</strong> {item.description} <br/>
                <strong>Category:</strong> {item.category} <br/>
                <strong>Status:</strong> {item.status} <br/>
                <strong>Price:</strong> ${item.price} <br/>
              </li>
          ))}
        </ul>
      </div>
  );
}

export default ShoppingPage;

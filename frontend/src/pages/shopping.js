import React, {useEffect, useState} from 'react';

//Assign a state to the items displayed
function ShoppingPage() {
  const [items, setItems] = useState([]);

  //Search for the information of the item
  useEffect(() => {
    const fetchItems = async () => {
      try {
        //Check with the server for networking and item status
        const response = await fetch('/items');
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
//Empty array
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

//Export everything in ShoppingPage to be used elsewhere
export default ShoppingPage;

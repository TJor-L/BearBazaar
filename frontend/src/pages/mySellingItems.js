import React, {useContext, useEffect, useState} from 'react';
import UserContext from '../contexts/userContext';
import EditItem from '../actions/editItem';

//Function for display and edit the item being sold
function MySellingItems({onClose}) {
  //Give an item the id and local state
  const [items, setItems] = useState([]);

  //Fetch for UserID
  const [contextUserID] = useContext(UserContext);
  const [selectedItemID, setSelectedItemID] = useState('');

  //Fetch the item for sell
  useEffect(() => {
    const fetchItems = async () => {
      try {
        //Check to see if matches
        const response = await fetch(`/itemsByUser/${contextUserID}`);
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || 'Network response was not ok');
        }
        const data = await response.json();
        setItems(data); //Update states of the item being fectched
      } catch (error) {
        console.log('There was a problem with the fetch operation:',
            error.message);
      }
    };

    fetchItems();
  }, []);

  //Edit button for an item
  function handleOnItemIDClick(ItemID) {
    setSelectedItemID(ItemID);
  }

  return (
      <div>
        <button onClick={onClose}>close</button>
        {items.map(item => (
            <div key={item.id}>
              <strong>Name:</strong> {item.name} <br/>
              <strong>Status:</strong> {item.status} <br/>
              <strong>Price:</strong> ${item.price} <br/>
              <button onClick={handleOnItemIDClick}>edit</button>
              {item.id === selectedItemID && <EditItem item={item}/>}
            </div>
        ))}
      </div>
  );
}

//Export MySellingItems for used elsewhere
export default MySellingItems;
import React, {useState} from 'react';

function EditItem({item}) {
  // 设置初始状态
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [category, setCategory] = useState(item.category);
  const [status, setStatus] = useState(item.status);
  const [price, setPrice] = useState(item.price);

  // PUT请求，更新项目
  const updateItem = async () => {
    try {
      const response = await fetch(`/items/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: item.id,
          owner: item.owner,
          name,
          description,
          category,
          status,
          price,
        }),
      });
      //Get response data
      const data = await response.json();

      //Reassuring update status of the item updated
      if (response.status === 200) {
        console.log('Item updated:', data);
      } else {
        console.error('Error updating item:', data);
      }
    } catch (error) {
      console.error('There was an error updating the item:', error);
    }
  };

  //Send delete request to remove item
  const deleteItem = async () => {
    //Sending a confirmation for deleting the item
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch(`/items/${item.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        //Check for item deletion status
        if (response.status === 200) {
          console.log('Item deleted successfully');
        } else {
          console.error('Error deleting item');
        }
      } catch (error) {
        console.error('There was an error deleting the item:', error);
      }
    }
  };

  //Edit form for the items
  return (
      <div>
        <form onSubmit={(e) => {
          e.preventDefault();
          updateItem();
        }}>
          <label>
            Name:
            <input type="text" value={name}
                   onChange={e => setName(e.target.value)}/>
          </label>
          <label>
            Description:
            <input type="text" value={description}
                   onChange={e => setDescription(e.target.value)}/>
          </label>
          <label>
            Category:
            <input type="text" value={category}
                   onChange={e => setCategory(e.target.value)}/>
          </label>
          <label>
            Status:
            <input type="text" value={status}
                   onChange={e => setStatus(e.target.value)}/>
          </label>
          <label>
            Price:
            <input type="number" value={price}
                   onChange={e => setPrice(e.target.value)}/>
          </label>
          <button type="submit">Update Item</button>
          <button onClick={deleteItem}>Delete Item</button>
        </form>
      </div>
  );
}

//Export everything here to use elsewhere
export default EditItem;

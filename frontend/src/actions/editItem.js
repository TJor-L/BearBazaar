import React, { useState } from 'react'
const apiUrl = process.env.BACKEND_URL || 'http://localhost';
const apiPort = process.env.BACKEND_PORT || '8080';
function EditItem ({ item }) {
  // 设置初始状态
  const [name, setName] = useState(item.name)
  const [description, setDescription] = useState(item.description)
  const [category, setCategory] = useState(item.category)
  const [status, setStatus] = useState(item.status)
  const [price, setPrice] = useState(item.price)

  // PUT请求，更新项目
  const updateItem = async () => {
    try {
      const response = await fetch(`${apiUrl}:${apiPort}/items/${item.id}`, {
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
      })
      const data = await response.json()
      if (response.status === 200) {
        console.log('Item updated:', data)
      } else {
        console.error('Error updating item:', data)
      }
    } catch (error) {
      console.error('There was an error updating the item:', error)
    }
  }

  const deleteItem = async () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch(`/items/${item.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (response.status === 200) {
          console.log('Item deleted successfully')
        } else {
          console.error('Error deleting item')
        }
      } catch (error) {
        console.error('There was an error deleting the item:', error)
      }
    }
  }

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault()
        updateItem()
      }}>
        <label>
          Name:
          <input type="text" value={name}
            onChange={e => setName(e.target.value)} />
        </label>
        <label>
          Description:
          <input type="text" value={description}
            onChange={e => setDescription(e.target.value)} />
        </label>
        <label>
          Category:
          <input type="text" value={category}
            onChange={e => setCategory(e.target.value)} />
        </label>
        <label>
          Status:
          <input type="text" value={status}
            onChange={e => setStatus(e.target.value)} />
        </label>
        <label>
          Price:
          <input type="number" value={price}
            onChange={e => setPrice(e.target.value)} />
        </label>
        <button type="submit">Update Item</button>
        <button onClick={deleteItem}>Delete Item</button>
      </form>
    </div>
  )
}

export default EditItem

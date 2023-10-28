import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../contexts/userContext'
import EditItem from '../actions/editItem'

function MySellingItems ({ onClose }) {
  const [items, setItems] = useState([])
  const [contextUserID] = useContext(UserContext)
  const [selectedItemID, setSelectedItemID] = useState('')

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`/itemsByUser/${contextUserID}`)
        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.message || 'Network response was not ok')
        }
        const data = await response.json()
        setItems(data)
      } catch (error) {
        console.log('There was a problem with the fetch operation:',
          error.message)
      }
    }

    fetchItems()
  }, [])

  function handleOnItemIDClick (ItemID) {
    setSelectedItemID(ItemID)
  }

  return (
    <div>
      <button onClick={onClose}>close</button>
      {items.map(item => (
        <div key={item.id}>
          <strong>Name:</strong> {item.name} <br />
          <strong>Status:</strong> {item.status} <br />
          <strong>Price:</strong> ${item.price} <br />
          <button onClick={handleOnItemIDClick}>edit</button>
          {item.id === selectedItemID && <EditItem item={item} />}
        </div>
      ))}
    </div>
  )
}

export default MySellingItems
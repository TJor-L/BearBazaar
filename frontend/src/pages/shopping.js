import React, { useState, useEffect } from 'react';

function ShoppingPage() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch('/items')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setItems(data))
            .catch(error => console.log('There was a problem with the fetch operation:', error.message));
    }, []);

    return (
        <div>
            <p>This is the shopping page</p>
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        <strong>Name:</strong> {item.name} <br />
                        <strong>Owner:</strong> {item.owner} <br />
                        <strong>Description:</strong> {item.description} <br />
                        <strong>Category:</strong> {item.category} <br />
                        <strong>Status:</strong> {item.status} <br />
                        <strong>Price:</strong> ${item.price} <br />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ShoppingPage;

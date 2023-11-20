const fakeTransactions = [
    {
        "transactionID": 1,
        "seller": {
            "userID": 508764,
            "username": "Dijkstra"
        },
        "buyer": {
            "userID": 123456,
            "username": "cx"
        },
        "itemID": 1,
        "amount": 100.00,
        "status": "confirmed"
    },
    {
        "transactionID": 2,
        "seller": {
            "userID": 123456,
            "username": "cx"
        },
        "buyer": {
            "userID": 508764,
            "username": "Dijkstra"
        },
        "itemID": 2,
        "amount": 200.00,
        "status": "paid"
    },
    {
        "transactionID": 3,
        "seller": {
            "userID": 508764,
            "username": "Dijkstra"
        },
        "buyer": {
            "userID": 123456,
            "username": "cx"
        },
        "itemID": 3,
        "amount": 150.00,
        "status": "received money"
    },
    {
        "transactionID": 4,
        "seller": {
            "userID": 123456,
            "username": "cx"
        },
        "buyer": {
            "userID": 508764,
            "username": "Dijkstra"
        },
        "itemID": 4,
        "amount": 250.00,
        "status": "finished"
    }
]

export default fakeTransactions;

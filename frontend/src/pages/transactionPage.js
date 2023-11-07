import React, { useContext, useEffect, useState } from 'react';
import { Layout, List, Typography, Row, Col, Button, message, Modal} from 'antd';
import { Link } from 'react-router-dom';
import faketransactions from '../fakedata/faketransactions';
import UserContext from '../contexts/userContext';

const { Content } = Layout;
const { Title } = Typography;

const apiUrl = process.env.BACKEND_URL || 'http://localhost';
const apiPort = process.env.BACKEND_PORT || '8080';

function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const { contextUserID, contextUsername } = useContext(UserContext);
    const [itemsData, setItemsData] = useState({});
    const [curTransaction, setCurTransaction] = useState(null);
    const [showPayModal, setShowPayModal] = useState(false);
    const [showReceivedModal, setShowReceivedModal] = useState(false);
    const [showMoneyReceivedModal, setShowMoneyReceivedModal] = useState(false);



    useEffect(() => {
        const fetchTransactions = async () => {
            try {

                const buyerResponse = await fetch(`${apiUrl}:${apiPort}/transaction/buyer/${contextUsername}`);
                const buyerTransactions = await buyerResponse.json();

                const sellerResponse = await fetch(`${apiUrl}:${apiPort}/transaction/seller/${contextUsername}`);
                const sellerTransactions = await sellerResponse.json();

                const combinedTransactions = [...buyerTransactions, ...sellerTransactions];

                setTransactions(combinedTransactions);
            } catch (error) {
                console.error('Failed to fetch transactions:', error);
            }
        };

        fetchTransactions();
    }, [contextUserID, showPayModal, showReceivedModal, showMoneyReceivedModal]);


    useEffect(() => {
        const fetchItemData = async () => {
            for (let transaction of transactions) {
                const itemId = transaction.item;
                if (!itemsData[itemId]) {
                    try {
                        const response = await fetch(`${apiUrl}:${apiPort}/items/${itemId}`);
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        const itemData = await response.json();
                        setItemsData(prevData => ({
                            ...prevData,
                            [itemId]: itemData
                        }));
                    } catch (error) {
                        console.error('There was a problem with the fetch operation:', error.message);
                    }
                }
            }
        };

        fetchItemData();
    }, [transactions]);

    useEffect(() => {
        console.log(transactions);
    }, [transactions]);

    const buyerActions = (status, transaction) => {
        switch (status) {
            case 'Confirmed':
                return [
                    <Button type="primary" onClick={() => handlePayClick(transaction)}>Pay</Button>
                    ];
            case 'Paid':
                return [<span>Wait seller to confirm</span>];
            case 'Received':
                return [
                    <Button type="primary" onClick={() => handleReceivedClick(transaction)}>I received the item</Button>
                ];
            default:
                return [];
        }
    };

    const handlePayClick = (transaction) => {
        //TODO: 在这里，你可以使用完整的transaction数据
        console.log(transaction);
        setCurTransaction(transaction);
        setShowPayModal(true);
    };

    const handleReceivedClick = (transaction) => {
        //TODO: 在这里，你可以使用完整的transaction数据
        console.log(transaction);
        setCurTransaction(transaction);
        setShowReceivedModal(true);
    };

    const handlePayment = () => {
        const transactionId = curTransaction.id; // 当前交易的ID
        const status = 'Paid'; // 这里设定你想要的状态，比如'Paid'

        fetch(`${apiUrl}:${apiPort}/transaction/${transactionId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'status': status
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Transaction updated successfully:', data);
                setShowPayModal(false);
            })
            .catch(error => {
                console.error('Error updating transaction:', error);
            });
    }

    const handleReceivedItem = () => {
        const transactionId = curTransaction.id; // 当前交易的ID
        const status = 'Completed'; // 这里设定你想要的状态，比如'Paid'

        fetch(`${apiUrl}:${apiPort}/transaction/${transactionId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'status': status
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Transaction updated successfully:', data);
                setShowReceivedModal(false);
            })
            .catch(error => {
                console.error('Error updating transaction:', error);
            });
    }

    const sellerActions = (status, transaction) => {
        switch (status) {
            case 'Confirmed':
                return [<span>Wait buyer to pay</span>];
            case 'Paid':
                return [
                    <Button type="primary" onClick={() => handleMoneyReceivedClick(transaction)}>I received the money</Button>
                ];
            case 'Received':
                return [<span>Wait buyer's confirmation of received item</span>];
            default:
                return [];
        }
    };

    const handleMoneyReceivedClick = (transaction) => {
        //TODO: 在这里，你可以使用完整的transaction数据
        console.log("**");
        console.log(transaction);
        setShowMoneyReceivedModal(true);
        setCurTransaction(transaction);
    };

    const handleReceivedMoney = () => {
        const transactionId = curTransaction.id; // 当前交易的ID
        const status = 'Received'; // 这里设定你想要的状态，比如'Paid'

        fetch(`${apiUrl}:${apiPort}/transaction/${transactionId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'status': status
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Transaction updated successfully:', data);
                setShowMoneyReceivedModal(false);
            })
            .catch(error => {
                console.error('Error updating transaction:', error);
            });
    }


    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Content style={{ padding: '3%' }}>
                <Row gutter={24}>
                    <Col span={12}>
                        <Title level={3}>Transactions as Buyer</Title>
                        <List
                            itemLayout="horizontal"
                            dataSource={transactions.filter(t => t.buyer.studentId == contextUserID)}
                            renderItem={item => (
                                <List.Item actions={buyerActions(item.status, item)}>
                                    <List.Item.Meta
                                        title={`${itemsData[item.item]?.name || ''}`}
                                        description={
                                            <div>
                                                <div>Seller: {item.seller.username}</div>
                                                <div>Amount: {item.price}$</div>
                                                <div>Status: {item.status}</div>
                                            </div>
                                        }
                                        avatar={<img src={itemsData[item.item]?.image[0].url} alt={itemsData[item.item]?.name} style={{ width: 70 }} />}
                                    />
                                </List.Item>
                            )}
                        />
                    </Col>
                    <Col span={12}>
                        <Title level={3}>Transactions as Seller</Title>
                        <List
                            itemLayout="horizontal"
                            dataSource={transactions.filter(t => t.seller.studentId == contextUserID)}
                            renderItem={item => (
                                <List.Item actions={sellerActions(item.status, item)}>
                                    <List.Item.Meta
                                        title={
                                            <Link to={`/item/${itemsData[item.item]?.id}`}>
                                                {itemsData[item.item]?.name || ''}
                                            </Link>
                                        }
                                        description={
                                            <div>
                                                <div>Seller: {item.seller.username}</div>
                                                <div>Amount: {item.price}$</div>
                                                <div>Status: {item.status}</div>
                                            </div>
                                        }
                                        avatar={
                                            <img src={itemsData[item.item]?.image[0].url} alt={itemsData[item.item]?.name} style={{ width: 70 }} />
                                        }
                                    />

                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
                <Modal
                    title="Payment Confirmation"
                    visible={showPayModal}
                    onCancel={() => setShowPayModal(false)}
                    footer={[
                        <Button key="back" onClick={() => setShowPayModal(false)}>
                            Cancel
                        </Button>,
                        <Button key="submit" type="primary" onClick={handlePayment}>
                            I Finished the Payment!
                        </Button>,
                    ]}
                    >
                    <p>Please pay to this phone number: {curTransaction===null? "not found": curTransaction.seller.phone}</p>
                </Modal>
                <Modal
                    title="Item Receipt Confirmation"
                    visible={showReceivedModal}
                    onCancel={() => setShowReceivedModal(false)}
                    footer={[
                        <Button key="back" onClick={() => setShowReceivedModal(false)}>
                            Cancel
                        </Button>,
                        <Button key="submit" type="primary" onClick={handleReceivedItem}>
                            Confirm Received
                        </Button>,
                    ]}
                >
                    {
                        curTransaction === null ? null : (
                            <p>
                                received the item from <Link to={`/user/${curTransaction.seller.studentId}`}>{curTransaction.seller.username}</Link>?
                            </p>
                        )
                    }
                </Modal>

                <Modal
                    title="Money Receipt Confirmation"
                    visible={showMoneyReceivedModal}
                    onCancel={() => setShowMoneyReceivedModal(false)}
                    footer={[
                        <Button key="back" onClick={() => setShowMoneyReceivedModal(false)}>
                            Cancel
                        </Button>,
                        <Button key="submit" type="primary" onClick={handleReceivedMoney}>
                            Confirm Received
                        </Button>,
                    ]}
                >
                    {(curTransaction===null)?null:<p>Have you received ${curTransaction.price} from <Link to={`/user/${curTransaction.buyer.studentId}`}>{curTransaction.buyer.username}?</Link></p>}
                </Modal>
            </Content>
        </Layout>
    );
}

export default Transactions;

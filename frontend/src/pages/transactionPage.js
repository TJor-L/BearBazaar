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
    const [showPayModal, setShowPayModal] = useState(false);
    const [showReceivedModal, setShowReceivedModal] = useState(false);
    const [showMoneyReceivedModal, setShowMoneyReceivedModal] = useState(false);



    useEffect(() => {
        // Replace this with your fetchTransactions when ready
        const userID = contextUserID;
        const filteredTransactions = faketransactions.filter(transaction =>
            transaction.seller.userID == userID || transaction.buyer.userID == userID
        );
        setTransactions(filteredTransactions);
    }, [contextUserID]);

    useEffect(() => {
        const fetchItemData = async () => {
            for (let transaction of transactions) {
                const itemId = transaction.itemID;
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
            case 'confirmed':
                return [
                    <Button type="primary" onClick={() => handlePayClick(transaction)}>Pay</Button>
                    ];
            case 'paid':
                return [<span>Wait seller to confirm</span>];
            case 'received money':
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
        setShowPayModal(true);
    };

    const handleReceivedClick = (transaction) => {
        //TODO: 在这里，你可以使用完整的transaction数据
        console.log(transaction);
        setShowReceivedModal(true);
    };


    const sellerActions = (status, transaction) => {
        switch (status) {
            case 'confirmed':
                return [<span>Wait buyer to pay</span>];
            case 'paid':
                return [
                    <Button type="primary" onClick={() => handleMoneyReceivedClick(transaction)}>I received the money</Button>
                ];
            case 'received money':
                return [<span>Wait buyer's confirmation of received item</span>];
            default:
                return [];
        }
    };

    const handleMoneyReceivedClick = (transaction) => {
        //TODO: 在这里，你可以使用完整的transaction数据
        console.log(transaction);
        setShowMoneyReceivedModal(true);
    };


    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Content style={{ padding: '3%' }}>
                <Row gutter={24}>
                    <Col span={12}>
                        <Title level={3}>Transactions as Buyer</Title>
                        <List
                            itemLayout="horizontal"
                            dataSource={transactions.filter(t => t.buyer.userID == contextUserID)}
                            renderItem={item => (
                                <List.Item actions={buyerActions(item.status, item)}>
                                    <List.Item.Meta
                                        title={`${itemsData[item.itemID]?.name || ''}`}
                                        description={
                                            <div>
                                                <div>Seller: {item.seller.username}</div>
                                                <div>Amount: {item.amount}</div>
                                                <div>Status: {item.status}</div>
                                            </div>
                                        }
                                        avatar={<img src={itemsData[item.itemID]?.image[0].url} alt={itemsData[item.itemID]?.name} style={{ width: 70 }} />}
                                    />
                                </List.Item>
                            )}
                        />
                    </Col>
                    <Col span={12}>
                        <Title level={3}>Transactions as Seller</Title>
                        <List
                            itemLayout="horizontal"
                            dataSource={transactions.filter(t => t.seller.userID == contextUserID)}
                            renderItem={item => (
                                <List.Item actions={sellerActions(item.status, item)}>
                                    <List.Item.Meta
                                        title={`${itemsData[item.itemID]?.name || ''}`}
                                        description={
                                            <div>
                                                <div>Seller: {item.seller.username}</div>
                                                <div>Amount: {item.amount}$</div>
                                                <div>Status: {item.status}</div>
                                            </div>
                                        }
                                        avatar={<img src={itemsData[item.itemID]?.image[0].url} alt={itemsData[item.itemID]?.name} style={{ width: 70 }} />}
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
                        <Button key="submit" type="primary" onClick={() => {
                            // TODO: 处理付款逻辑...
                            setShowPayModal(false);
                        }}>
                            Paid
                        </Button>,
                    ]}
                    >
                    <p>Please pay to this phone number: 123456789</p>
                </Modal>
                <Modal
                    title="Item Receipt Confirmation"
                    visible={showReceivedModal}
                    onCancel={() => setShowReceivedModal(false)}
                    footer={[
                        <Button key="back" onClick={() => setShowReceivedModal(false)}>
                            Cancel
                        </Button>,
                        <Button key="submit" type="primary" onClick={() => {
                            // TODO: 处理收货逻辑...
                            setShowReceivedModal(false);
                        }}>
                            I received the item
                        </Button>,
                    ]}
                >
                    <p>Did you receive the item in good condition?</p>
                </Modal>
                <Modal
                    title="Money Receipt Confirmation"
                    visible={showMoneyReceivedModal}
                    onCancel={() => setShowMoneyReceivedModal(false)}
                    footer={[
                        <Button key="back" onClick={() => setShowMoneyReceivedModal(false)}>
                            Cancel
                        </Button>,
                        <Button key="submit" type="primary" onClick={() => {
                            // TODO: 处理收到款项的逻辑...
                            setShowMoneyReceivedModal(false);
                        }}>
                            Confirm Received
                        </Button>,
                    ]}
                >
                    <p>Have you received the money from the buyer?</p>
                </Modal>
            </Content>
        </Layout>
    );
}

export default Transactions;

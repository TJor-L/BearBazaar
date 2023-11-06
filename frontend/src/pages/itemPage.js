import React, { useEffect, useState, useContext} from 'react';
import { useParams, Link } from 'react-router-dom';
import {Row, Col, Image, Button, Typography, Layout, Modal, Input, Tag, message, List} from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import UserContext from "../contexts/userContext";
import fakeItemsMap from "../fakedata/fakeItemsMap";

const { Title, Text } = Typography;

const { Content } = Layout;

function ItemPage() {
    const { contextUsername, contextUserID } = useContext(UserContext);
    const [isOwner, setIsOwner] = useState(false);
    const [bids, setBids] = useState([]);
    const { itemID } = useParams(); // 从URL中读取itemID
    const [item, setItem] = useState(fakeItemsMap.find(item => item.itemID ===itemID));
    const [isFavorited, setIsFavorited] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [bidAmount, setBidAmount] = useState(''); // 用户输入的出价
    const [editedItem, setEditedItem] = useState({ itemName: '', description: '' });
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [userBid, setUserBid] = useState(null);

    const fetchBidsForItem = () => {

        //TODO: 这里是样例代码，是错的。总之获取到用户对于这个商品的出价，和所有对这个商品的出价
        // try {
        //     const response = await fetch(`yourBackendURL/item/${itemID}/bids`);
        //     if (response.ok) {
        //         const data = await response.json();
        //         setBids(data);
        //
        //         const currentUserBid = data.find(bid => bid.buyerID === contextUserID);
        //         if (currentUserBid) {
        //             setUserBid(currentUserBid.price);
        //         }
        //     } else {
        //         const data = await response.json();
        //         console.error('Failed to fetch bids for item:', data.message);
        //     }
        // } catch (error) {
        //     console.error('There was an error fetching the bids for the item:', error);
        // }
        const fakeBids = [
            {
                bidID: '1',
                buyerID: 'user001',
                buyerUsername: 'Alice',
                price: 100.00
            },
            {
                bidID: '2',
                buyerID: 'user002',
                buyerUsername: 'Bob',
                price: 105.00
            },
            {
                bidID: '3',
                buyerID: 'user003',
                buyerUsername: 'Charlie',
                price: 110.00
            },
            {
                bidID: '4',
                buyerID: 'user004',
                buyerUsername: 'David',
                price: 120.00
            }
        ];


        setBids(fakeBids);
        setUserBid(100);
    }

    const handleAcceptBid = async (bidID) => {
        try {
            const response = await fetch(`yourBackendURL/bids/${bidID}/accept`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // 这里可以处理接受出价成功的逻辑，例如从bids中移除这个出价
                setBids(prevBids => prevBids.filter(bid => bid.bidID !== bidID));
            } else {
                const data = await response.json();
                console.error('Failed to accept the bid:', data.message);
            }
        } catch (error) {
            console.error('There was an error accepting the bid:', error);
        }
    }

    const handleRejectBid = async (bidID) => {
        try {
            const response = await fetch(`yourBackendURL/bids/${bidID}/reject`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // 这里可以处理拒绝出价成功的逻辑，例如从bids中移除这个出价
                setBids(prevBids => prevBids.filter(bid => bid.bidID !== bidID));
            } else {
                const data = await response.json();
                console.error('Failed to reject the bid:', data.message);
            }
        } catch (error) {
            console.error('There was an error rejecting the bid:', error);
        }
    }


    const handleDeleteItem =  () => {
        // try {
        //     const response = await fetch(`yourBackendURL/item/${itemID}`, {
        //         method: 'DELETE',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         // 这里你可以根据后端的要求添加其他的请求体或者请求头
        //     });
        //
        //     if (response.ok) {
        //         // 处理成功删除的逻辑，例如：跳转到其他页面或给出成功的提示
        //         alert("Item deleted successfully");
        //         // 这里你可以使用`history`来导航到其他页面，例如：
        //         history.push('/home');
        //     } else {
        //         // 处理错误信息
        //         const data = await response.json();
        //         console.error('Failed to delete the item:', data.message);
        //         alert("Failed to delete the item. Please try again later.");
        //     }
        // } catch (error) {
        //     console.error('There was an error deleting the item:', error);
        //     alert("There was an error deleting the item. Please try again later.");
        // }
        message.success("Item deleted successfully");
    }

    const handleOpenEditModal = () => {
        setIsEditModalVisible(true);
        setEditedItem({
            itemName: item.itemName,
            description: item.description,
            imageURL: item.imageURL,
            estimatedPrice: item.estimatedPrice.toString(),
            category: item.category
        });
    }



    const handleCloseEditModal = () => {
        setIsEditModalVisible(false);
    }

    const handleSaveChanges = () => {
        // Save changes to backend
        // For demonstration, just updating the item locally
        setItem(prevItem => ({ ...prevItem, itemName: editedItem.itemName, description: editedItem.description,
            imageURL: editedItem.imageURL, estimatedPrice: editedItem.estimatedPrice, category: editedItem.category}));
        setIsEditModalVisible(false);
    }


    const handleOpenModal = () => {
        if (!contextUserID) {
            // Prompt the user to log in
            alert("Please log in to continue.");
            return;
        }
        setBidAmount(item.estimatedPrice.toString()); // 使用商品估价作为默认出价，并将其转换为字符串以适应Input组件
        setIsModalVisible(true);
    }


    const handleCloseModal = () => {
        setIsModalVisible(false);
        setBidAmount(''); // 清除输入框内容
    }

    const toggleFavorite = async () => {
        // try {
        //     // 更新后端的收藏状态
        //     const response = await fetch(`yourBackendURL/favorite`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             userID: contextUserID,
        //             itemID: itemID,
        //         }),
        //     });
        //
        //     if (response.ok) {
        //         setIsFavorited(prevState => !prevState); // 切换收藏状态
        //     } else {
        //         // 处理错误
        //         const data = await response.json();
        //         console.error('Failed to update favorite status:', data.message);
        //     }
        // } catch (error) {
        //     console.error('There was an error updating the favorite status:', error);
        // }
        setIsFavorited(prevState => !prevState)
    }

    const handleConfirmPurchase = async () => {
        try {
            const response = await fetch(`yourBackendURL/purchase`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userID: contextUserID, // 假设您已经在组件内部有这个context
                    itemID: itemID,
                    bid: bidAmount
                }),
            });

            if (response.ok) {
                // 这里可以处理购买成功的逻辑，例如提醒用户购买成功
                setIsModalVisible(false); // 关闭模态窗口
            } else {
                // 处理错误信息
                const data = await response.json();
                console.error('Failed to purchase:', data.message);
            }
        } catch (error) {
            console.error('There was an error making the purchase:', error);
        }
    }

    useEffect(() => {
        // async function fetchData() {
        //     try {
        //         const response = await fetch(`yourBackendURL/item/${itemID}`);
        //         const data = await response.json();
        //
        //         if (response.ok) {
        //             setItem(data);
        //         } else {
        //             console.error('Failed to fetch item:', data.message);
        //         }
        //     } catch (error) {
        //         console.error('There was an error fetching the item:', error);
        //     }
        // }
        //
        // fetchData();
        setItem(fakeItemsMap.find(item => item.itemID ===itemID));
        setIsFavorited(item.isFavorited)
        if (item.owner.userId === contextUserID) {
            setIsOwner(true);
        }
        else {
            setIsOwner(false);
        }
        if (item) {
            fetchBidsForItem();
        }
    }, [itemID, contextUserID]);

    function generateAmazonSearchURL(query) {
        return `https://www.amazon.com/s?k=${encodeURIComponent(query)}`;
    }
    
    if (!item) return <p>Loading...</p>;

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Content>
                <Row justify="center" gutter={32} style={{ height: '100%', marginTop: "3%" }}>
                    <Col span={6}>
                        <Image
                            width={400}
                            src={item.imageURL}
                        />
                    </Col>
                    <Col span={8}>
                        <Title level={2} style={{ display: 'flex', alignItems: 'center' }}>
                            {item.itemName}
                            <span style={{ marginLeft: '10px' }}>
                            {
                                contextUserID && (isFavorited ?
                                    <StarFilled style={{ color: 'gold', fontSize: '20px' }} onClick={toggleFavorite} /> :
                                    <StarOutlined style={{ fontSize: '20px' }} onClick={toggleFavorite} />)
                            }

                            </span>
                        </Title>

                        <div style={{ marginBottom: '15px' }}>
                            <Tag color="blue">item.category</Tag>
                        </div>

                        <Text strong>Estimated Price: </Text><br />${item.estimatedPrice}<br /><br />
                        <Text strong>Description: </Text><br />{item.description}<br /><br />
                        <Text strong>Owned by: </Text><br /><Link to={`/user/${item.owner.userId}`}>{item.owner.username}</Link><br /><br />
                        <Text strong>Estimated Price: </Text><br />${item.estimatedPrice}<br /><br />
                        <Button 
                        type="default" 
                        onClick={() => window.open(generateAmazonSearchURL(item.itemName), '_blank')}
                        >
                        Search on Amazon
                        </Button>
                        <br /><br />
                        {!isOwner && (
                            <>
                                <Button type="primary" style={{ marginRight: '10px' }} onClick={handleOpenModal}>Buy</Button>
                                {contextUserID!=='' && userBid!==0 && <Text>Your previous bid: {userBid}</Text>}
                            </>
                        )}
                        {isOwner && (
                            <div style={{ marginTop: '20px' }}>
                                <Title level={3}>All Bids</Title>
                                <List
                                    bordered
                                    dataSource={bids}
                                    renderItem={bid => (
                                        <List.Item>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                                <Text strong><span>Buyer ID: <Link to={`/user/${bid.buyerID}`}> {bid.buyerUsername}</Link>, Price: ${bid.price}</span></Text>
                                                <div>
                                                    <Button type="primary" style={{ marginRight: '10px' }} onClick={() => handleAcceptBid(bid.bidID)}>Accept</Button>
                                                    <Button type="default" danger onClick={() => handleRejectBid(bid.bidID)}>Reject</Button>
                                                </div>
                                            </div>
                                        </List.Item>
                                    )}
                                />
                            </div>
                        )}

                        <Modal
                            title="Place your bid"
                            visible={isModalVisible}
                            onOk={handleConfirmPurchase}
                            onCancel={handleCloseModal}
                        >
                            <Input
                                type="number"
                                prefix="$"
                                placeholder="Enter your bid"
                                value={bidAmount}
                                onChange={(e) => setBidAmount(e.target.value)}
                            />
                        </Modal>
                    </Col>
                    {
                        isOwner &&
                        <>
                            <Button onClick={handleOpenEditModal} style={{ marginRight: '10px' }}>Edit</Button>
                            <Button type="default" danger onClick={handleDeleteItem}>Delete</Button>
                        </>
                    }

                    <Modal
                        title="Edit Item Details"
                        visible={isEditModalVisible}
                        onOk={handleSaveChanges}
                        onCancel={handleCloseEditModal}
                    >
                        <Input
                            placeholder="Item Name"
                            value={editedItem.itemName}
                            onChange={(e) => setEditedItem(prev => ({ ...prev, itemName: e.target.value }))}
                        />
                        <br /><br />
                        <Input
                            placeholder="Image URL"
                            value={editedItem.imageURL}
                            onChange={(e) => setEditedItem(prev => ({ ...prev, imageURL: e.target.value }))}
                        />
                        {/*TODO: Debug here*/}
                        <br /><br />
                        <Input
                            placeholder="Estimated Price"
                            type="number"
                            prefix="$"
                            value={editedItem.estimatedPrice}
                            onChange={(e) => setEditedItem(prev => ({ ...prev, estimatedPrice: e.target.value }))}
                        />
                        <br /><br />
                        <Input.TextArea
                            rows={4}
                            placeholder="Description"
                            value={editedItem.description}
                            onChange={(e) => setEditedItem(prev => ({ ...prev, description: e.target.value }))}
                        />
                        <br /><br />
                        <Input
                            placeholder="Category (comma separated)"
                            value={editedItem.category}
                            onChange={(e) => setEditedItem(prev => ({ ...prev, category: e.target.value}))}
                        />
                        
                    </Modal>

                </Row>
            </Content>
        </Layout>
    );
}

export default ItemPage;

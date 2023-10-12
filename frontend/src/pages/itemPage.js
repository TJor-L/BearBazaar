import React, { useEffect, useState, useContext} from 'react';
import { useParams, Link } from 'react-router-dom';
import {Row, Col, Image, Button, Typography, Layout, Modal, Input, Tag} from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import UserContext from "../contexts/userContext";

const { Title, Text } = Typography;

const { Content } = Layout;

function ItemPage() {
    const { contextUsername, contextUserID } = useContext(UserContext);
    const { itemID } = useParams(); // 从URL中读取itemID
    const [item, setItem] = useState(null);
    const [isFavorited, setIsFavorited] = useState(false); // 初始值可能来自服务器
    const fakeData = {
        itemID: '1234567890',
        imageURL: 'https://via.placeholder.com/400', // 使用一个占位图生成器。在实际应用中，这应该是商品图片的URL。
        itemName: 'Example Product Name',
        estimatedPrice: 99.99,
        owner: {
            userId: '508764',
            username: 'Dijkstra'
        },
        category: ['cat1', 'cat2', 'cat3'],
        description: 'This is a sample description for the example product. It provides details about the product such as its features, benefits, and other relevant information.',
        isFavorited: true
    };
    const [isModalVisible, setIsModalVisible] = useState(false); // 控制Modal的可见性
    const [bidAmount, setBidAmount] = useState(''); // 用户输入的出价

    const handleOpenModal = () => {
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
        setItem(fakeData);
        setIsFavorited(fakeData.isFavorited)
    }, [itemID]);

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
                                isFavorited ?
                                    <StarFilled style={{ color: 'gold', fontSize: '20px' }} onClick={toggleFavorite} /> :
                                    <StarOutlined style={{ fontSize: '20px' }} onClick={toggleFavorite} />
                            }
                            </span>
                        </Title>

                        <div style={{ marginBottom: '15px' }}>
                            {item.category.map((cat, index) => (
                                <Tag key={index} color="blue">{cat}</Tag>
                            ))}
                        </div>

                        <Text strong>Estimated Price: </Text><br />${item.estimatedPrice}<br /><br />
                        <Text strong>Description: </Text><br />{item.description}<br /><br />
                        <Text strong>Owned by: </Text><br /><Link to={`/user/${item.owner.userId}`}>{item.owner.username}</Link><br /><br />
                        <Button type="primary" style={{ marginRight: '10px' }} onClick={handleOpenModal}>Buy</Button>
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
                </Row>

            </Content>
        </Layout>
    );
}

export default ItemPage;

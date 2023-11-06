import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import { Row, Col, Image, Button, Typography, Layout, Modal, Input, Tag, message, List, Carousel, Form, Select, Upload } from 'antd'
import { StarOutlined, StarFilled, UploadOutlined } from '@ant-design/icons'
import UserContext from "../contexts/userContext"
import fakeItems from "../fakedata/fakeitems"
const apiUrl = process.env.BACKEND_URL || 'http://localhost';
const apiPort = process.env.BACKEND_PORT || '8080';

const { Title, Text } = Typography

const { Content } = Layout

function ItemPage () {
    const { contextUsername, contextUserID } = useContext(UserContext)
    const [isOwner, setIsOwner] = useState(false)
    const [bids, setBids] = useState([])
    const { itemID } = useParams() // 从URL中读取itemID
    const [item, setItem] = useState(null)
    const [fileList, setFileList] = useState([])
    const [isFavorited, setIsFavorited] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [bidAmount, setBidAmount] = useState('') // 用户输入的出价
    const [editedItem, setEditedItem] = useState({ name: '', description: '' })
    const [isEditModalVisible, setIsEditModalVisible] = useState(false)
    const [userBid, setUserBid] = useState(null)
    const navigate = useNavigate()

    const location = useLocation()

    useEffect(() => {
        async function fetchData () {
            try {
                const response = await fetch(`${apiUrl}:${apiPort}/items/${itemID}`)
                const data = await response.json()

                if (response.ok) {
                    setItem(data)
                } else {
                    console.error('Failed to fetch item:', data.message)
                }
            } catch (error) {
                console.error('There was an error fetching the item:', error)
            }
        }
        fetchData()
    }, [itemID, contextUserID])

    useEffect(() => {
        if (item) {
            console.log(item)
            setIsFavorited(item.isFavorited)
            if (item.owner.username === contextUsername) {
                setIsOwner(true)
            } else {
                setIsOwner(false)
            }
            fetchBidsForItem();
        }
    }, [item, contextUsername])

    const fetchBidsForItem = async () => {

        try {
            const response = await fetch(`${apiUrl}:${apiPort}/item/${itemID}/bids`);
            if (response.ok) {
                const data = await response.json();
                setBids(data);

                const currentUserBid = data.find(bid => bid.buyerID === contextUserID);
                if (currentUserBid) {
                    setUserBid(currentUserBid.price);
                }
            } else {
                const data = await response.json();
                console.error('Failed to fetch bids for item:', data.message);
            }
        } catch (error) {
            console.error('There was an error fetching the bids for the item:', error);
        }
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
            const response = await fetch(`${apiUrl}:${apiPort}/bids/${bidID}/accept`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                //TODO: delete all bids
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
            const response = await fetch(`${apiUrl}:${apiPort}/bids/${bidID}/reject`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                //TODO:
                setBids(prevBids => prevBids.filter(bid => bid.bidID !== bidID));
            } else {
                const data = await response.json();
                console.error('Failed to reject the bid:', data.message);
            }
        } catch (error) {
            console.error('There was an error rejecting the bid:', error);
        }
    }


    async function handleDeleteItem () {
        try {
            const response = await fetch(`${apiUrl}:${apiPort}/items/${itemID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (response.ok) {
                alert("Item deleted successfully")
                navigate('/home')
            } else {
                const data = await response.json()
                console.error('Failed to delete the item:', data.message)
                alert("Failed to delete the item. Please try again later.")
            }
        } catch (error) {
            console.error('There was an error deleting the item:', error)
            alert("There was an error deleting the item. Please try again later.")
        }
        message.success("Item deleted successfully")
    }

    const handleOpenEditModal = () => {
        setIsEditModalVisible(true)
        setEditedItem({
            name: item.name,
            description: item.description,
            price: item.price,
            category: item.category
        })
    }

    const handleUploadChange = ({ fileList }) => {
        setFileList(fileList)
    }

    const handleCloseEditModal = () => {
        setIsEditModalVisible(false)
    }

    async function handleSaveChanges () {
        if (!editedItem.name || !editedItem.description || !editedItem.category || !editedItem.price) {
            message.error('All fields are required!')
            return
        }

        // Create a new FormData object for handling file uploads and form data
        const formData = new FormData()

        // Append the form data in the order as seen in the screenshot
        formData.append('name', editedItem.name)
        formData.append('category', editedItem.category)
        formData.append('description', editedItem.description)
        formData.append('price', editedItem.price)

        // Append the images; fileList should be an array of File objects
        fileList.forEach((file) => {
            formData.append('images', file.originFileObj)
        })


        const response = await fetch(`${apiUrl}:${apiPort}/items/${itemID}`, {
            method: 'PUT',
            body: formData,
        })

        if (response.ok) {
            message.success('Item edited successfully')
            handleCloseEditModal()
            navigate(`/item/${itemID}`)
        } else {
            const data = await response.json()
            console.error('Error from server:', data)
        }
    }


    const handleOpenModal = () => {
        if (!contextUserID) {
            alert("Please log in to continue.")
            return
        }
        setBidAmount(item.estimatedPrice.toString())
        setIsModalVisible(true)
    }


    const handleCloseModal = () => {
        setIsModalVisible(false)
        setBidAmount('') // 清除输入框内容
    }

    const toggleFavorite = async () => {
        try {
            // 更新后端的收藏状态
            const response = await fetch(`${apiUrl}:${apiPort}/favorite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userID: contextUserID,
                    itemID: itemID,
                }),
            });

            if (response.ok) {
                setIsFavorited(prevState => !prevState); // 切换收藏状态
            } else {
                // 处理错误
                const data = await response.json();
                console.error('Failed to update favorite status:', data.message);
            }
        } catch (error) {
            console.error('There was an error updating the favorite status:', error);
        }
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
            })

            if (response.ok) {
                // 这里可以处理购买成功的逻辑，例如提醒用户购买成功
                setIsModalVisible(false) // 关闭模态窗口
            } else {
                // 处理错误信息
                const data = await response.json()
                console.error('Failed to purchase:', data.message)
            }
        } catch (error) {
            console.error('There was an error making the purchase:', error)
        }
    }



    if (!item) return <p>Loading...</p>

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Content>
                <Row justify="center" gutter={32} style={{ height: '100%', marginTop: "3%" }}>
                    <Col span={6}>
                        <Carousel autoplay>
                            {item.image.map((img, index) => (
                                <div key={index}>
                                    <Image width={400} src={img.url} />
                                </div>
                            ))}
                        </Carousel>
                    </Col>
                    <Col span={8}>
                        <Title level={2} style={{ display: 'flex', alignItems: 'center' }}>
                            {item.name}
                            {<span style={{ marginLeft: '10px' }}>
                                {
                                    contextUserID && (isFavorited ?
                                        <StarFilled style={{ color: 'gold', fontSize: '20px' }} onClick={toggleFavorite} /> :
                                        <StarOutlined style={{ fontSize: '20px' }} onClick={toggleFavorite} />)
                                }

                            </span>}
                        </Title>

                        <div style={{ marginBottom: '15px' }}>
                            <Tag color="blue">{item.category}</Tag>
                        </div>

                        <Text strong>Estimated Price: </Text><br />${item.price}<br /><br />
                        <Text strong>Description: </Text><br />{item.description}<br /><br />
                        <Text strong>Owned by: </Text><br /><Link to={`/user/${item.owner.studentId}`}>{item.owner.username}</Link><br /><br />
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
                        <Form layout="vertical">
                            <Form.Item label="Name" required>
                                <Input
                                    value={editedItem.name}
                                    onChange={(e) => setEditedItem(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="Name"
                                />
                            </Form.Item>

                            <Form.Item label="Description" required>
                                <Input.TextArea
                                    rows={4}
                                    value={editedItem.description}
                                    onChange={(e) => setEditedItem(prev => ({ ...prev, description: e.target.value }))}
                                    placeholder="Description"
                                />
                            </Form.Item>

                            <Form.Item label="Category" required>
                                <Select
                                    value={editedItem.category}
                                    onChange={(value) => setEditedItem(prev => ({ ...prev, category: value }))}
                                    placeholder="Category"
                                >
                                    <Select.Option value="fashion">Fashion</Select.Option>
                                    <Select.Option value="sport">Sport</Select.Option>
                                    <Select.Option value="electro">Electro</Select.Option>
                                    <Select.Option value="book">Book</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item label="Estimated Price" required>
                                <Input
                                    value={editedItem.price}
                                    onChange={(e) => setEditedItem(prev => ({ ...prev, price: e.target.value }))}
                                    placeholder="Price"
                                />
                            </Form.Item>

                            <Form.Item label="Upload Image">
                                <Upload
                                    fileList={fileList}
                                    onChange={handleUploadChange}
                                    beforeUpload={() => false} // prevent auto uploading
                                >
                                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                </Upload>
                            </Form.Item>

                        </Form>
                    </Modal>

                </Row>
            </Content>
        </Layout>
    )
}

export default ItemPage

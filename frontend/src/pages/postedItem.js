import React, { useContext, useEffect, useState } from 'react'
import { Layout, List, Typography, Card, message } from 'antd'
import { Link } from 'react-router-dom'
import fakeItems from "../fakedata/fakeitems"
import UserContext from "../contexts/userContext"

const { Content } = Layout
const apiUrl = process.env.BACKEND_URL || 'http://localhost';
const apiPort = process.env.BACKEND_PORT || '8080';
function PostedItems () {
    const [items, setItems] = useState([])

    const { contextUserID, contextUsername } = useContext(UserContext)

    useEffect(() => {
        // 当组件加载时，发送POST请求
        fetchItems()
    }, [contextUserID])

    const fetchItems = async () => {
        try {
            const response = await fetch(`${apiUrl}:${apiPort}/items/owner/${contextUsername}`)

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            const data = await response.json()
            setItems(data)
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error.message)
        }
    }


    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Content style={{ padding: '3%' }}>
                <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={items}
                    renderItem={item => (
                        <List.Item>
                            <Link to={`/item/${item.id}`}>
                                <Card
                                    hoverable
                                    cover={<img alt={item.name} src={item.image.length === 0 ? 'https://via.placeholder.com/150' : item.image[0].url} />}
                                >
                                    <Typography.Title level={4}>{item.name}</Typography.Title>
                                    <Typography.Text>Estimated Price: ${item.price}</Typography.Text>
                                </Card>
                            </Link>
                        </List.Item>
                    )}
                />
            </Content>
        </Layout>
    )
}

export default PostedItems

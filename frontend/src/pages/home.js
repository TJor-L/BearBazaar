import React, { useEffect, useState } from 'react'
import { Card, Layout, List, Typography } from 'antd'
import { Link } from 'react-router-dom'

const { Content } = Layout


function HomePage () {
    const [items, setItems] = useState([])

    useEffect(() => {
        // Fetch actual data from the backend
        const fetchData = async () => {
            try {
                const response = await fetch('http://www.dijkstraliu.com:5000/items')

                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }

                const data = await response.json()
                setItems(data)
            } catch (error) {
                console.error('There was a problem fetching the items:', error)
            }
        }

        fetchData()
    }, [])

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

export default HomePage;


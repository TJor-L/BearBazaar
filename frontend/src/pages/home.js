import React, { useEffect, useState } from 'react'
import { Card, Layout, List, Typography } from 'antd'
import { Link } from 'react-router-dom'
import fakeItems from '../fakedata/fakeItems';
import fakeItemMap from '../fakedata/fakeItemsMap';
 
const apiUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost'
const apiPort = process.env.REACT_APP_BACKEND_PORT || '8080'

const { Content } = Layout

function HomePage () {
    const [items, setItems] = useState([])
    const cardStyle = {
        width: 350, 
        height: 500,
        overflow: 'hidden'
    };
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiUrl}:${apiPort}/items`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error('There was a problem fetching the items:', error);
            }
        }

        fetchData();
    }, []);


    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Content style={{ padding: '3%' }}>
                <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={items}
                    renderItem={item => (
                        <List.Item>
                            <Link to={`/item/${item.itemID}`}>
                                <Card
                                    hoverable
                                    style={cardStyle}
                                    cover={<img alt={item.name} src={item.image.length === 0 ? 'https://via.placeholder.com/150' : item.image[0].url} style={{ width: '100%', height: '100%' }} />}
                                >
                                    <Typography.Title level={4}>{item.itemName}</Typography.Title>
                                    <Typography.Text>Estimated Price: ${item.estimatedPrice}</Typography.Text>
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

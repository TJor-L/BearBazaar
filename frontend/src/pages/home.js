import React, {useEffect, useState} from 'react';
import {Card, Layout, List, Typography} from 'antd';
import { Link } from 'react-router-dom';

const { Content } = Layout;


function HomePage() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        // 模拟从后端获取数据的fetch请求
        const fetchData = async () => {
            // 使用setTimeout模拟网络延迟
            await new Promise(resolve => setTimeout(resolve, 500));

            // 五个fakedata
            const fakeData = [
                { itemID: '1', itemName: 'Item One', imageURL: 'https://via.placeholder.com/150', estimatedPrice: 50 },
                { itemID: '2', itemName: 'Item Two', imageURL: 'https://via.placeholder.com/150', estimatedPrice: 75 },
                { itemID: '3', itemName: 'Item Three', imageURL: 'https://via.placeholder.com/150', estimatedPrice: 35 },
                { itemID: '4', itemName: 'Item Four', imageURL: 'https://via.placeholder.com/150', estimatedPrice: 80 },
                { itemID: '5', itemName: 'Book One', imageURL: 'https://via.placeholder.com/150', estimatedPrice: 60 },
                { itemID: '6', itemName: 'Book Two', imageURL: 'https://via.placeholder.com/150', estimatedPrice: 45 },
                { itemID: '7', itemName: 'Computer One', imageURL: 'https://via.placeholder.com/150', estimatedPrice: 110 },
                { itemID: '8', itemName: 'Computer Two', imageURL: 'https://via.placeholder.com/150', estimatedPrice: 95 },
                { itemID: '9', itemName: '132 Kit', imageURL: 'https://via.placeholder.com/150', estimatedPrice: 55 },
                { itemID: '10', itemName: '132 Kit', imageURL: 'https://via.placeholder.com/150', estimatedPrice: 70 }
            ];


            setItems(fakeData);
        };

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
                                    cover={<img alt={item.itemName} src={item.imageURL} />}
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
    );

}

export default HomePage;


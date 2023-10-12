import React, {useEffect, useState} from 'react';
import {Card, Layout, List, Typography} from 'antd';
import { Link } from 'react-router-dom';
import fakeItems from "../fakedata/fakeitems";

const { Content } = Layout;


function HomePage() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        // 模拟从后端获取数据的fetch请求
        const fetchData = async () => {
            // 使用setTimeout模拟网络延迟
            await new Promise(resolve => setTimeout(resolve, 500));
            setItems(fakeItems);
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


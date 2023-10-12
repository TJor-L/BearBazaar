import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, Layout, List, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Content } = Layout;

function SearchingPage() {
    const [searchParams] = useSearchParams();
    const [filteredItems, setFilteredItems] = useState([]);

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

    useEffect(() => {
        const searchKey = searchParams.get('searchkey')?.toLowerCase() || '';
        const minPrice = parseFloat(searchParams.get('minPrice') || 0);
        const maxPrice = parseFloat(searchParams.get('maxPrice') || Infinity);

        const filtered = fakeData.filter(item =>
            item.itemName.toLowerCase().includes(searchKey) &&
            item.estimatedPrice >= minPrice &&
            item.estimatedPrice <= maxPrice
        );

        setFilteredItems(filtered);
    }, [searchParams]);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Content style={{ padding: '3%' }}>
                <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={filteredItems}
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

export default SearchingPage;

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, Layout, List, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Content } = Layout;

function SearchingPage() {
    const [searchParams] = useSearchParams();
    const [filteredItems, setFilteredItems] = useState([]);

    const fakeData = [
        { itemID: '1', itemName: 'Item One', imageURL: 'https://via.placeholder.com/150', estimatedPrice: 50, categories: ['Electronics', 'New Arrival']},
        { itemID: '2', itemName: 'Item Two', imageURL: 'https://via.placeholder.com/150', estimatedPrice: 75, categories: ['Fashion', 'Clothing']},
        { itemID: '3', itemName: 'Item Three', imageURL: 'https://via.placeholder.com/150', estimatedPrice: 35, categories: ['Home Goods', 'Best Seller']},
        { itemID: '4', itemName: 'Item Four', imageURL: 'https://via.placeholder.com/150', estimatedPrice: 80, categories: ['Electronics', 'Trending']},
        { itemID: '5', itemName: 'Book One', imageURL: 'https://via.placeholder.com/150', estimatedPrice: 60, categories: ['Books', 'Best Seller']},
        { itemID: '6', itemName: 'Book Two', imageURL: 'https://via.placeholder.com/150', estimatedPrice: 45, categories: ['Books', 'New Release']},
        { itemID: '7', itemName: 'Computer One', imageURL: 'https://via.placeholder.com/150', estimatedPrice: 110, categories: ['Electronics', 'Computers']},
        { itemID: '8', itemName: 'Computer Two', imageURL: 'https://via.placeholder.com/150', estimatedPrice: 95, categories: ['Electronics', 'Laptops']},
        { itemID: '9', itemName: '132 Kit', imageURL: 'https://via.placeholder.com/150', estimatedPrice: 55, categories: ['Toys', 'Hobbies']},
        { itemID: '10', itemName: '132 Kit', imageURL: 'https://via.placeholder.com/150', estimatedPrice: 70, categories: ['Toys', 'Best Seller']}
    ];


    useEffect(() => {
        const searchKey = searchParams.get('searchkey')?.toLowerCase() || '';
        const minPrice = parseFloat(searchParams.get('minPrice') || 0);
        const maxPrice = parseFloat(searchParams.get('maxPrice') || Infinity);
        const categories = searchParams.get('categories')?.split(',') || [];  // Assume categories are comma-separated in the URL

        const filtered = fakeData.filter(item => {
            // Check if item matches search key
            const matchesSearchKey = item.itemName.toLowerCase().includes(searchKey) || searchKey==='';

            // Check if item matches price range
            const matchesPriceRange = item.estimatedPrice >= minPrice && item.estimatedPrice <= maxPrice;

            // Check if item matches any of the selected categories. If no categories are selected, show all items.
            const matchesCategory = categories.length === 0 || categories.some(category => item.categories.includes(category));

            return matchesSearchKey && matchesPriceRange && matchesCategory;
        });

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

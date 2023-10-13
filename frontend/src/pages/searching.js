import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, Layout, List, Typography } from 'antd';
import { Link } from 'react-router-dom';
import fakeItems from "../fakedata/fakeitems";

const { Content } = Layout;

function SearchingPage() {
    const [searchParams] = useSearchParams();
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        const searchKey = searchParams.get('searchkey')?.toLowerCase() || '';
        const minPrice = parseFloat(searchParams.get('minPrice') || 0);
        const maxPrice = parseFloat(searchParams.get('maxPrice') || Infinity);
        const categories = searchParams.get('categories')?.split(',') || [];  // Assume categories are comma-separated in the URL
        console.log('Search Key:', searchKey);
        console.log('Min Price:', minPrice);
        console.log('Max Price:', maxPrice);
        console.log('Selected Categories:', categories);

        const filtered = fakeItems.filter(item => {
            console.log(item.category)
            // Check if item matches search key
            const matchesSearchKey = item.itemName.toLowerCase().includes(searchKey) || searchKey==='';

            // Check if item matches price range
            const matchesPriceRange = item.estimatedPrice >= minPrice && item.estimatedPrice <= maxPrice;


            // Check if item matches any of the selected categories. If no categories are selected, show all items.
            const matchesCategory = categories.includes('all') || categories.includes('') || categories.includes(item.category);

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

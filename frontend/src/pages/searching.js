import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Card, Layout, List, Typography } from 'antd'
import { Link } from 'react-router-dom'
import fakeItems from "../fakedata/fakeitems"

const { Content } = Layout
const apiUrl = process.env.BACKEND_URL || 'http://localhost';
const apiPort = process.env.BACKEND_PORT || '8080';
function SearchingPage () {
    const [searchParams] = useSearchParams()
    const [filteredItems, setFilteredItems] = useState([])


    const [items, setItems] = useState([])

    useEffect(() => {
        // Fetch actual data from the backend
        const fetchData = async () => {
            try {
                const searchKey = searchParams.get('searchkey')?.toLowerCase() || ''
                const minPrice = parseFloat(searchParams.get('minPrice') || 0)
                const maxPrice = parseFloat(searchParams.get('maxPrice') || Infinity)
                const categories = searchParams.get('categories')?.split(',') || []  // Assume categories are comma-separated in the URL
                const response = await fetch(`${apiUrl}:${apiPort}/items`)

                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }

                const data = await response.json()
                setItems(data)

                const filtered = data.filter(item => {
                    // Check if item matches search key
                    const matchesSearchKey = item.name.toLowerCase().includes(searchKey) || searchKey === ''

                    // Check if item matches price range
                    const matchesPriceRange = item.price >= minPrice && item.price <= maxPrice

                    // Check if item matches any of the selected categories. If no categories are selected, show all items.
                    const matchesCategory = categories.includes('all') || categories.includes(item.category)  || categories.includes("")

                    return matchesSearchKey && matchesPriceRange && matchesCategory
                })

                setFilteredItems(filtered)
            } catch (error) {
                console.error('There was a problem fetching the items:', error)
            }
        }

        fetchData()
    }, [searchParams])



    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Content style={{ padding: '3%' }}>
                <List
                    grid={{ gutter: 16, column: 4 }}
                    dataSource={filteredItems}
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

export default SearchingPage

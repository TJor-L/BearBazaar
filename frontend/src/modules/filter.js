import React, { useState } from 'react';
import { Slider, Select, Button, Row, Col } from 'antd';

const { Option } = Select;

function Filter({ onCancel, onSubmit }) {

    const [items, setItems] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 1000]);


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

    const categories = [...new Set(fakeData.flatMap(item => item.categories))];

    function onFilterSubmit(){
        const [minPrice, maxPrice] = priceRange;
        const filterData = {
            "categories" : categoryFilter, // This is now an array
            "minPrice" : minPrice,
            "maxPrice" : maxPrice
        }
        onSubmit(filterData);
    }

    return (
        <div className='filter'>
            <Row gutter={16} className='filter-setting'>
                <Col span={32}>
                    <label>
                        Category:
                        <Select
                            mode="multiple" // Add this for multiple selections
                            value={categoryFilter}
                            onChange={value => setCategoryFilter(value)}
                            style={{ width: '100%' }}
                        >
                            {categories.map(cat => <Option key={cat} value={cat}>{cat}</Option>)}
                        </Select>
                    </label>
                </Col>
                <Col span={16} style={{ marginTop: '20px' }}>
                    <label>Price Range:</label>
                    <Slider
                        range
                        value={priceRange}
                        onChange={value => setPriceRange(value)}
                        min={0}
                        max={1000} // You can adjust the max value as required
                    />
                </Col>
            </Row>
            <Row className="filter-panel" justify="end" style={{ marginTop: '20px' }}>
                <Col>
                    <Button className="cancel-button" onClick={() => onCancel()} style={{ marginRight: '10px' }}>Cancel</Button>
                    <Button type="primary" className="submit-button" onClick={() => onFilterSubmit()}>Submit</Button>
                </Col>
            </Row>
        </div>
    );
}

export default Filter;

import React, { useState } from 'react';
import { Slider, Select, Button, Row, Col } from 'antd';

const { Option } = Select;

function Filter({ onCancel, onSubmit }) {

    const [items, setItems] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [priceRange, setPriceRange] = useState([0, 1000]);

    function onFilterSubmit(){
        const [minPrice, maxPrice] = priceRange;
        const filterData = {
            "categories" : categoryFilter,
            "minPrice" : minPrice,
            "maxPrice" : maxPrice
        }
        onSubmit(filterData);
    }

    return (
        <div className='filter'>
            <Row gutter={16} className='filter-setting'>
                <Col span={8}>
                    <label>
                        Category:
                        <Select
                            value={categoryFilter}
                            onChange={value => setCategoryFilter(value)}
                            style={{ width: '100%' }}
                        >
                            <Option value="">All</Option>
                            {/* Add more categories here */}
                        </Select>
                    </label>
                </Col>
                <Col span={16}>
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

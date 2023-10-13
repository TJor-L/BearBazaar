import React, { useState } from 'react';
import { Slider, Select, Button, Row, Col } from 'antd';
import fakeItems from "../fakedata/fakeitems";

const { Option } = Select;

function Filter({ onCancel, onSubmit }) {

    const [items, setItems] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 1000]);


    const categories = [...new Set(fakeItems.flatMap(item => item.categories))];

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

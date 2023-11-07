import React, { useState } from 'react'
import { Slider, Select, Button, Row, Col } from 'antd'
import fakeItems from "../fakedata/fakeitems"
import categories from "../categories";

const { Option } = Select

function Filter ({ onCancel, onSubmit }) {

    const [items, setItems] = useState([])
    const [categoryFilter, setCategoryFilter] = useState(["all"])
    const [priceRange, setPriceRange] = useState([0, 1000])


    const categoryValues = ['all', ...categories.map(cat => cat.value)];

    function onFilterSubmit () {
        const [minPrice, maxPrice] = priceRange
        const filterData = {
            "categories": categoryFilter, // This is now an array
            "minPrice": minPrice,
            "maxPrice": maxPrice
        }
        onSubmit(filterData)
    }

    function handleCategoryChange (value) {
        // If "all" is selected, reset other selections
        if (value.includes("all")) {
            setCategoryFilter(["all"])
        } else {
            setCategoryFilter(value)
        }
    }


    return (
        <div className='filter'>
            <Row gutter={16} className='filter-setting'>
                <Col span={32}>
                    <label>
                        Category:
                        <Select
                            mode="multiple"
                            value={categoryFilter}
                            onChange={handleCategoryChange}
                            style={{ width: '100%' }}
                        >
                            {categoryValues.map(cat => <Option key={cat} value={cat}>{cat}</Option>)}
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
                        max={500} // You can adjust the max value as required
                    />
                </Col>
            </Row>
            <Row className="filter-panel" justify="end" style={{ marginTop: '20px' }}>
                <Col>
                    <Button className="cancel-button" onClick={() => onCancel()} style={{ marginRight: '10px' }}>Cancel</Button>
                    <Button type="primary" className="submit-button" onClick={() => onFilterSubmit()}>Save Changes</Button>
                </Col>
            </Row>
        </div>
    )
}

export default Filter

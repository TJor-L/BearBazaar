import React, { useState } from 'react'
import { Slider, Select, Button, Row, Col, InputNumber } from 'antd'
import fakeItems from "../fakedata/fakeItems"
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

    function onMinPriceChange(value) {
        if (value <= priceRange[1]) { // Prevent the minimum price from being greater than the maximum
            setPriceRange([value, priceRange[1]]);
        }
    }

    function onMaxPriceChange(value) {
        if (value >= priceRange[0]) { // Prevent the maximum price from being less than the minimum
            setPriceRange([priceRange[0], value]);
        }
    }

    function handleCategoryChange(value) {
        // If 'all' is in the selection and it's not the only selected value
        if (value.includes('all') && value.length > 1) {
            if (value[value.length - 1] === 'all') {
                // User has just clicked 'all', reset to only 'all'
                setCategoryFilter(['all']);
            } else {
                // User has selected a category, remove 'all' from the selection
                setCategoryFilter(value.filter(cat => cat !== 'all'));
            }
        } else {
            setCategoryFilter(value);
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
                <Col span={24} style={{ marginTop: '20px' }}>
                    <label>Price Range: {priceRange[0]} - {priceRange[1]}</label>
                    <Row>
                        <Col span={12}>
                            <InputNumber
                                min={0}
                                max={1000} // Can be adjusted as required
                                value={priceRange[0]}
                                onChange={onMinPriceChange}
                                style={{ margin: '0 0px' }}
                            />
                        </Col>
                        <Col span={12}>
                            <InputNumber
                                min={0}
                                max={1000} // Can be adjusted as required
                                value={priceRange[1]}
                                onChange={onMaxPriceChange}
                                style={{ margin: '0 72px' }}
                            />
                        </Col>
                    </Row>
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
                    <Button type="primary" className="submit-button" onClick={() => onFilterSubmit()}>Save Changes</Button>
                </Col>
            </Row>
        </div>
    )
}

export default Filter

import React, { useState } from 'react';
import Filter from "./filter";
import { useNavigate } from 'react-router-dom';
import { Button, Input, Drawer } from 'antd';

function SearchBar() {

    const navigate = useNavigate();

    const [filterData, setFilterData] = useState({
        "categories" : 'all',
        "minPrice" : 0,
        "maxPrice" : 2147483647
    });

    const [searchKey, setSearchKey] = useState('default');
    const [selectedFilter, setSelectedFilter] = useState(false);

    function handleSwitchFilterClick() {
        setSelectedFilter(!selectedFilter)
    }

    function handleCancelFilterClick() {
        setSelectedFilter(false)
    }

    function handleSubmitFilterClick(submitedFilterData) {
        setSelectedFilter(false);
        setFilterData(submitedFilterData);
    }

    function handleSubmitSearch() {
        navigate(`/searching?searchkey=${searchKey}&categories=${filterData.categories}&minPrice=${filterData.minPrice}&maxPrice=${filterData.maxPrice}`);
    }

    return (
        <div className="search-bar">
            <Button onClick={handleSwitchFilterClick}>Filter</Button>
            <Drawer
                title="Filter"
                placement="left"
                closable={true}
                onClose={handleCancelFilterClick}
                visible={selectedFilter}
            >
                <Filter onCancel={handleCancelFilterClick} onSubmit={handleSubmitFilterClick} />
            </Drawer>
            <Input
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                placeholder="Search Bear Bazaar"
            />
            <Button onClick={handleSubmitSearch}>Submit</Button>
        </div>
    );
}

export default SearchBar;

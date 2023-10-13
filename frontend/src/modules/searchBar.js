import React, { useState } from 'react';
import Filter from "./filter";
import { useNavigate } from 'react-router-dom';
import { Button, Input, Drawer, Menu} from 'antd';

function SearchBar() {

    const navigate = useNavigate();

    const [filterData, setFilterData] = useState({
        "categories" : '',
        "minPrice" : 0,
        "maxPrice" : 1000
    });

    const [searchKey, setSearchKey] = useState('');
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
        <Menu.Item style={{width: '500px'}}>
            <Button onClick={handleSwitchFilterClick} style={{width: '20%', marginRight:'3%'}}>Filter</Button>
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
                style={{width: '54%'}}
            />
            <Button onClick={handleSubmitSearch} style={{width: '20%', marginLeft:'3%'}}>Submit</Button>
        </Menu.Item>
    );
}

export default SearchBar;

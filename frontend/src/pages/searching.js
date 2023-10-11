import React from 'react';
import { useSearchParams } from 'react-router-dom';  // <-- Import useSearchParams

function SearchingPage() {
    const [searchParams] = useSearchParams();  // <-- Use useSearchParams

    return (
        <div>
            <p>This is the searching page</p>
            <p>Search Key: {searchParams.get('searchkey')}</p>
            <p>Categories: {searchParams.get('categories')}</p>
            <p>Min Price: {searchParams.get('minPrice')}</p>
            <p>Max Price: {searchParams.get('maxPrice')}</p>
        </div>
    );
}

export default SearchingPage;

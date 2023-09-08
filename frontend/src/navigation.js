import React, { useState } from 'react'

function Navigation ({ onNavigationItemClick }) {

    function handlePageClick (pageName) {
        onNavigationItemClick(pageName)
    }

    return (
        <div className='nav'>
            <ul>
                <li><a href="#" onClick={() => handlePageClick('home')}>Home</a></li>
                <li><a href="#" onClick={() => handlePageClick('shopping')}>Shopping</a></li>
            </ul>
        </div>
    )
}

export default Navigation
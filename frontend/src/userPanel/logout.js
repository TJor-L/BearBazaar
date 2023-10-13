import React, { useContext } from 'react';
import { Button } from 'antd';
import UserContext from '../contexts/userContext';

function Logout({ onClose }) {
    const { setContextUsername, setContextUserID } = useContext(UserContext);

    const handleLogout = () => {
        // Reset context values
        setContextUsername('');
        setContextUserID('');
        onClose();
    };

    return (
        <div className="logout">
            <h2>Logout Confirmation</h2>
            <p>Are you sure you want to logout?</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <Button onClick={onClose} style={{ marginRight: '10px' }}>Cancel</Button>
                <Button type="primary" onClick={handleLogout}>Logout</Button>
            </div>
        </div>
    );
}

export default Logout;

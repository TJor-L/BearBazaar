import React, { useContext } from 'react';
import * as Const from './const';
import UserContext from './contexts/userContext';
import { Link } from 'react-router-dom';
import SearchBar from './modules/searchBar';
import { Menu } from 'antd';  // <-- Import antd Menu

function Navigation({ onUserPanelClick }) {

    const { contextUsername } = useContext(UserContext);

    return (
        <Menu mode="horizontal">
            <Menu.Item key="home">
                <Link to={Const.HOME}>Home</Link>
            </Menu.Item>
            {contextUsername ? (
                <>
                    <Menu.Item key="user">

                        <Link to={Const.USER}>Welcome! {contextUsername}</Link>
                    </Menu.Item>
                    <Menu.Item key="logout" onClick={() => onUserPanelClick(Const.LOGOUT)}>
                        Logout
                    </Menu.Item>
                </>
            ) : (
                <>
                    <Menu.Item key="login" onClick={() => onUserPanelClick(Const.LOGIN)}>
                        Login
                    </Menu.Item>
                    <Menu.Item key="register" onClick={() => onUserPanelClick(Const.REGISTER)}>
                        Register
                    </Menu.Item>
                </>
            )}

            <Menu.Item key="search">
                <SearchBar />
            </Menu.Item>
        </Menu>
    );
}

export default Navigation;

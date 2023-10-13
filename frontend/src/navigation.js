import React, { useContext } from 'react';
import * as Const from './const';
import UserContext from './contexts/userContext';
import { Link } from 'react-router-dom';
import SearchBar from './modules/searchBar';
import { Menu, Button} from 'antd';
import logo from "./logo.png";  // <-- Import antd Menu

function Navigation({ onUserPanelClick }) {

    const { contextUsername, contextUserID} = useContext(UserContext);

    return (
        <Menu mode="horizontal" style={{ width: '100%',height: '100%', marginRight: '0%'}}>
            <Menu.Item key="home">
                <Link to={Const.HOME}>
                    <img src={logo} className="App-logo" alt="logo" style={{ width: '50px', height: '50px', marginTop: '10px' }} />
                </Link>
            </Menu.Item>
            {contextUsername ? (
                <>
                    <Menu.Item key="user">

                        <Link to={Const.USER + `/${contextUserID}`}>Welcome! {contextUsername}</Link>
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


            <SearchBar />

            {contextUsername && (
                <Menu.Item key="postItem" style={{ marginLeft: 'auto', marginRight:"5%"}}>
                    <Link to="/postitem">
                        <Button type="primary">Sell My Item!</Button>
                    </Link>
                </Menu.Item>
            )}

        </Menu>
    );
}

export default Navigation;

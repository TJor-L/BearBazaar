import logo from './logo.png';
import './App.css';
import Navigation from './navigation';
import UserPanel from './userPanel/userPanel';
import React, {useContext, useEffect, useState} from 'react';
import Draggable from 'react-draggable';
import * as Const from './const';
import UserContext from './contexts/userContext';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import ChatBox from "./modules/chatBox";
import UserPage from './pages/user';
import HomePage from './pages/home';
import SearchingPage from './pages/searching';
import ItemPage from "./pages/itemPage";
import PostItem from "./pages/postItem";
import PostedItems from "./pages/postedItem";
import Transactions from "./pages/transactionPage";

import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';


import {Layout, Button, Modal} from 'antd';
const { Header, Content } = Layout;


const apiUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost'
const apiPort = process.env.REACT_APP_BACKEND_PORT || '8080'

function App() {
    const storedTokenSession = sessionStorage.getItem('authToken');
    const storedUsernameSession = sessionStorage.getItem('username');
    const storedUserIDSession = sessionStorage.getItem('userID');

    const storedTokenLocal = localStorage.getItem('authToken');
    const storedUsernameLocal = localStorage.getItem('username');
    const storedUserIDLocal = localStorage.getItem('userID');

    const initialToken = storedTokenSession || storedTokenLocal;
    const initialUsername = storedUsernameSession || storedUsernameLocal;
    const initialUserID = storedUserIDSession || storedUserIDLocal;

    const [selectedUserPanel, setSelectedUserPanel] = useState(Const.CLOSE);
    const [showChatBox, setShowChatBox] = useState(false);
    const [contextUsername, setContextUsername] = useState(initialUsername || '');
    const [contextUserID, setContextUserID] = useState(initialUserID || '');

    const [ws, setWs] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState([{id: null, sender: "Agent", receiver: contextUsername,
        send_date: new Date().toISOString(),
        content: "I am BearAgent, a guide assistant for the WashU Bear Bazaar second-hand trading platform. My role is to help recommend products to users. How can I assist you today?"}])

    const [hasUnreadMessages, setHasUnreadMessages] = useState(false);


    function handleOnUserPanelClick(panelName) {
    setSelectedUserPanel(panelName);
  }

  //close user panel
  function handleCloseUserPanelClick() {
    setSelectedUserPanel(Const.CLOSE);
  }

    useEffect(() => {

        const socket = new SockJS(`${apiUrl}:${apiPort}/chat`);
        const stompClient = new Client({
            webSocketFactory: () => socket,
            debug: function (str) {
                console.log('STOMP Debug:', str);
            },
            onConnect: () => {
                console.log("Connected to WebSocket");
                setIsConnected(true); // 设置连接状态为 true

                stompClient.subscribe('/topic/chatspace', (message) => {
                    // 处理收到的消息
                    const messageData = JSON.parse(message.body);
                    console.log('Received message object:', messageData);
                    setMessages(prevMessages => [...prevMessages, messageData]);
                    // 可以根据需要进一步处理 message
                    console.log(messages)

                    if (!showChatBox) {
                        setHasUnreadMessages(true);
                    }
                });
                // ... 订阅逻辑 ...
            },
            onStompError: (error) => {
                console.error('STOMP Error:', error);
                setIsConnected(false);
            },
            // ... 其他事件处理 ...
        });

        stompClient.activate();
        setWs(stompClient);

        return () => {
            if (stompClient) {
                stompClient.deactivate();
            }
        };
    }, []);

    function PrivateRoute({ children }) {
        let isAuthenticated = checkAuthFunction(); // replace with your auth check

        if (!isAuthenticated) {
            return <Navigate to="/login" />;
        }

        return children;
    }
    const toggleChatBox = () => {
        setShowChatBox(!showChatBox);
        if (!showChatBox) {
            setHasUnreadMessages(false);
        }
    };
    function checkAuthFunction() {
        // Check if an auth token exists in local or session storage
        const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

        // Return true if a token exists, otherwise false
        return !!token;
    }

    return (
        <UserContext.Provider value={{ contextUsername, setContextUsername, contextUserID, setContextUserID }}>
            <Router>
                <Layout className="layout">
                    <Header style={{ display: 'flex', alignItems: 'center' }}>
                        <Navigation onUserPanelClick={handleOnUserPanelClick} />
                    </Header>
                    <Content>
                        {selectedUserPanel !== Const.CLOSE && <UserPanel onClose={handleCloseUserPanelClick} selectedUserPanel={selectedUserPanel} />}
                        <Routes>
                            <Route path="/user/:urlUserID" element={<UserPage />} />
                            <Route path="/home" element={<HomePage />} />
                            <Route path="/searching" element={<SearchingPage />} />
                            <Route path="/item/:itemID" element={<ItemPage/>} />
                            <Route path="/postitem" element={<PrivateRoute><PostItem/></PrivateRoute>} />
                            <Route path="/posted-item" element={<PrivateRoute><PostedItems/></PrivateRoute>} />
                            <Route path="/transactions" element={<PrivateRoute><Transactions/></PrivateRoute>} />
                            <Route path="/" element={<HomePage />} exact />
                        </Routes>
                        {
                            showChatBox && (
                               <ChatBox ws={ws} messages={messages} onClose={toggleChatBox}/>
                            )
                        }


                            {contextUsername!=='' &&
                                <Draggable>
                                    <Button className="chat-toggle-button" onClick={toggleChatBox}  style={{
                                        position: 'fixed',
                                        left: `${window.innerWidth - 200}px`,
                                        top: `${window.innerHeight - 100}px`
                                    }} type="primary" shape="round" size={'large'}>
                                        Chat {hasUnreadMessages && <span className="unread-messages-dot"></span>}
                                    </Button>
                                </Draggable>
                            }
                    </Content>
                </Layout>
            </Router>
        </UserContext.Provider>
    );
}

export default App;

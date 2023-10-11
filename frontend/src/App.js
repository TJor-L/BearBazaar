import logo from './logo.png';
import './App.css';
import Navigation from './navigation';
import Body from './body';
import UserPanel from './userPanel/userPanel';
import {useState} from 'react';
import * as Const from './const';
import UserContext from './contexts/userContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import UserPage from './pages/user';
import HomePage from './pages/home';
import SearchingPage from './pages/searching';

import { Layout} from 'antd';
const { Header, Content } = Layout;

function App() {
  //initialization: page at home, user panel closed
  const [selectedUserPanel, setSelectedUserPanel] = useState(Const.CLOSE);
  const [contextUsername, setContextUsername] = useState('');
  const [contextUserID, setContextUserID] = useState('');

  //open selected user panel
  function handleOnUserPanelClick(panelName) {
    setSelectedUserPanel(panelName);
  }

  //close user panel
  function handleCloseUserPanelClick() {
    setSelectedUserPanel(Const.CLOSE);
  }

    return (
        <UserContext.Provider value={{ contextUsername, setContextUsername, contextUserID, setContextUserID }}>
            <Router>
                <Layout className="layout">
                    <Header style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={logo} className="App-logo" alt="logo" style={{ width: '50px', marginRight: '20px' }} />
                        <Navigation onUserPanelClick={handleOnUserPanelClick} />
                    </Header>
                    <Content>
                        {selectedUserPanel !== Const.CLOSE && <UserPanel onClose={handleCloseUserPanelClick} selectedUserPanel={selectedUserPanel} />}
                        <Routes>
                            <Route path="/user" element={<UserPage />} />
                            <Route path="/home" element={<HomePage />} />
                            <Route path="/searching" element={<SearchingPage />} />
                            <Route path="/" element={<HomePage />} exact />
                        </Routes>
                    </Content>
                </Layout>
            </Router>
        </UserContext.Provider>
    );
}

export default App;

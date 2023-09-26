import logo from './logo.png';
import './App.css';
import Navigation from './navigation';
import Body from './body';
import UserPanel from './userPanel/userPanel';
import {useState} from 'react';
import * as Const from './const';
import UserContext from './contexts/userContext';

function App() {
  //initialization: page at home, user panel closed
  const [selectedPage, setSelectedPage] = useState('home');
  const [selectedUserPanel, setSelectedUserPanel] = useState(Const.CLOSE);
  const [contextUsername, setContextUsername] = useState('');
  const [contextUserID, setContextUserID] = useState('');

  //go to selected page
  function handleOnNavigationItemClick(pageName) {
    setSelectedPage(pageName);
  }

  //open selected user panel
  function handleOnUserPanelClick(panelName) {
    setSelectedUserPanel(panelName);
  }

  //close user panel
  function handleCloseUserPanelClick() {
    setSelectedUserPanel(Const.CLOSE);
  }

  return (
      <UserContext.Provider value={{
        contextUsername,
        setContextUsername,
        contextUserID,
        setContextUserID,
      }}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <p>Welcome to Bear Bazaar!!</p>
            <Navigation onNavigationItemClick={handleOnNavigationItemClick}
                        onUserPanelClick={handleOnUserPanelClick}/>
          </header>

          {selectedUserPanel !== Const.CLOSE &&
              <UserPanel onClose={handleCloseUserPanelClick}
                         selectedUserPanel={selectedUserPanel}/>}

          <Body selectedPage={selectedPage}/>
        </div>
      </UserContext.Provider>
  );
}

export default App;

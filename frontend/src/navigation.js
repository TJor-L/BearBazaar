import React, {useContext} from 'react';
import * as Const from './const';
import UserContext from './contexts/userContext';

function Navigation({onNavigationItemClick, onUserPanelClick}) {

  const {contextUsername, contextUserID} = useContext(UserContext);

  function handlePageClick(pageName) {
    onNavigationItemClick(pageName);
  }

  function handleUserPanelClick(panelName) {
    onUserPanelClick(panelName);
  }

  return (
      <div className="nav">
        <ul>
          <li><a href="#" onClick={() => handlePageClick(Const.HOME)}>Home</a>
          </li>
          <li><a href="#"
                 onClick={() => handlePageClick(Const.SHOPPING)}>Shopping</a>
          </li>
          {contextUsername &&
              <p>Welcome！ {contextUsername} {contextUserID} </p>}
          {!contextUsername && <div>
            <li><a href="#"
                   onClick={() => handleUserPanelClick(Const.LOGIN)}>Login</a>
            </li>
            <li><a href="#" onClick={() => handleUserPanelClick(
                Const.REGISTER)}>Register</a></li>
          </div>}


        </ul>
      </div>
  );
}

export default Navigation;

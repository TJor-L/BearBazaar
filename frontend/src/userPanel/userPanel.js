import React, { useContext } from 'react';
import * as Const from '../const';
import Login from './login';
import Register from './register';
import UserContext from '../contexts/userContext';
import Logout from './logout';

function UserPanel({onClose, selectedUserPanel}) {
  const { clearUser } = useContext(UserContext); 

  const handleLogout = () => {
    clearUser();
    onClose(); 
  };

  return (
    <div className="user-panel-overlay">
      <div className="user-panel-content">
        <button onClick={onClose}>close</button>
        {selectedUserPanel === Const.LOGIN && <Login onClose={onClose}/>}
        {selectedUserPanel === Const.REGISTER && <Register onClose={onClose}/>}
        {selectedUserPanel === Const.LOGOUT && <Logout onClose={handleLogout}/>}
      </div>
    </div>
  );
}

export default UserPanel;

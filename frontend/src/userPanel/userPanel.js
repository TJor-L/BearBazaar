import {useState, useContext} from 'react';
import * as Const from '../const';
import Login from './login';
import Register from './register';
import UserContext from '../contexts/userContext';

function UserPanel({onClose, selectedUserPanel}) {
  const [selectedPage, setSelectedPage] = useState();
  const { clearUser } = useContext(UserContext); 

  const handleLogout = () => {
    clearUser(); // Clear the user context
    onClose(); 
  };

  return (
    <div className="user-panel-overlay">
      <div className="user-panel-content">
        <button onClick={onClose}>close</button>
        {selectedUserPanel === Const.LOGIN && <Login onClose={onClose}/>}
        {selectedUserPanel === Const.REGISTER && <Register onClose={onClose}/>}
        {selectedUserPanel !== Const.LOGIN && selectedUserPanel !== Const.REGISTER && (
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>
    </div>
  );
}

export default UserPanel;

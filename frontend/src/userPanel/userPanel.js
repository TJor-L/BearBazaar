import {useState} from 'react';
import * as Const from '../const';
import Login from './login';
import Register from './register';

//"&&" works as if statement and deals with use input passed in the function
function UserPanel({onClose, selectedUserPanel}) {
  const [selectedPage, setSelectedPage] = useState();
  return (
      <div className="user-panel-overlay">
        <div className="user-panel-content">
          <button onClick={onClose}>close</button>
          {selectedUserPanel === Const.LOGIN && <Login onClose={onClose}/>}
          {selectedUserPanel === Const.REGISTER && <Register onClose={onClose}/>}
        </div>
      </div>
  );
}

export default UserPanel;
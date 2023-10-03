import {useContext, useState} from 'react';
import * as Const from '../const';
import UpdateUserInfo from '../actions/updateUserInfo';
import PostItem from '../actions/postItem';
import MySellingItems from "./mySellingItems";
import UserContext from '../contexts/userContext';
import SearchPanel from './searchPanel';  // Import the SearchPanel component
import Logout from '../userPanel/logout';

function HomePage() {
  const [state, setState] = useState(Const.CLOSE);
  const {contextUsername, contextUserID} = useContext(UserContext);

  // Mock items array, replace it with real item data
  const items = ['item1', 'item2', 'item3', 'item4']; 

  function handleCloseUserStateClick() {
    setState(Const.CLOSE);
  }

  // Define a new function handleLogoutClose to change state upon logout
  function handleLogoutClose() {
    setState(Const.CLOSE);
    // Optionally, add more logic here to handle logout, e.g., redirect, display message, etc.
  }

  return (
      <div>
        {/* Include SearchPanel component and pass items array */}
        <SearchPanel items={items} />
        
        {state === Const.CLOSE && contextUserID !== '' && <div>
          <button onClick={() => setState(Const.UPDATEUSERINFO)}>Update User Info</button>
          <button onClick={() => setState(Const.POSTITEM)}>Post Item</button>
          <button onClick={() => setState(Const.MYSELLINGITEMS)}>My selling items</button>
          <button onClick={() => setState(Const.LOGOUT)}>Logout</button> {/* Add Logout Button */}
        </div>}
        {state === Const.UPDATEUSERINFO && <UpdateUserInfo onClose={handleCloseUserStateClick}/>}
        {state === Const.POSTITEM && <PostItem onClose={handleCloseUserStateClick}/>}
        {state === Const.MYSELLINGITEMS && <MySellingItems onClose={handleCloseUserStateClick}/>}
        {state === Const.LOGOUT && <Logout onClose={handleLogoutClose}/>} {/* Pass handleLogoutClose function */}
      </div>
  );
}

export default HomePage;

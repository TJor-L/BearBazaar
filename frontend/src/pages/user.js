import {useContext, useState} from 'react';
import * as Const from '../const';
import UpdateUserInfo from '../actions/updateUserInfo';
import PostItem from '../actions/postItem';
import MySellingItems from "./mySellingItems";
import UserContext from '../contexts/userContext';

function UserPage() {
  const [state, setState] = useState(Const.CLOSE);
  const {contextUsername, contextUserID} = useContext(UserContext);

  function handleCloseUserStateClick() {
    setState(Const.CLOSE);
  }

  return (
      <div>
        {state === Const.CLOSE && contextUserID !== '' && <div>
          <button onClick={() => setState(Const.UPDATEUSERINFO)}>Update User
            Info
          </button>
          <button onClick={() => setState(Const.POSTITEM)}>Post Item</button>
          <button onClick={() => setState(Const.MYSELLINGITEMS)}>My selling
            items
          </button>
        </div>}
        {state === Const.UPDATEUSERINFO &&
            <UpdateUserInfo onClose={handleCloseUserStateClick}/>}
        {state === Const.POSTITEM &&
            <PostItem onClose={handleCloseUserStateClick}/>}
        {state === Const.MYSELLINGITEMS &&
            <MySellingItems onClose={handleCloseUserStateClick}/>}
      </div>
  );
}

export default UserPage;
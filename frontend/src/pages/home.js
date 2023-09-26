import {useContext, useState} from 'react';
import * as Const from '../const';
import UpdateUserInfo from '../actions/updateUserInfo';
import PostItem from '../actions/postItem';
import UserContext from '../contexts/userContext';

function HomePage() {
  const [state, setState] = useState(Const.CLOSE);

  //Extract user details
  const {contextUsername, contextUserID} = useContext(UserContext);

  //Return to the main buttons
  function handleCloseUserStateClick() {
    setState(Const.CLOSE);
  }

//Components Rendering
  return (
    //Statements of what button will appear if one thing is closed
    //First three determines the bottons being displayed and the last three returns to HomePage when things are closed
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

//Export everything in the HomePage to be used elsewhere
export default HomePage;
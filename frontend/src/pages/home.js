import {useContext, useState} from "react";
import * as Const from "../const"
import {POSTITEM, UPDATEUSERINFO} from "../const";
import UpdateUserInfo from "../actions/updateUserInfo";
import PostItem from "../actions/postItem";
import UserContext from "../contexts/userContext";

function HomePage() {
    const [state, setState] = useState(Const.CLOSE)
    const {contextUsername, contextUserID } = useContext(UserContext);
    function handleCloseUserStateClick() {
        setState(Const.CLOSE)
    }
    return (
        <div>
            {state === Const.CLOSE && contextUserID !== "" && <div>
                <button onClick={() => setState(Const.UPDATEUSERINFO)}>Update User Info</button>
                <button onClick={() => setState(Const.POSTITEM)}>Post Item</button>
            </div>}
            {state === Const.UPDATEUSERINFO && <UpdateUserInfo onClose={handleCloseUserStateClick}/>}
            {state === Const.POSTITEM && <PostItem onClose={handleCloseUserStateClick}/>}
        </div>
    )
}

export default HomePage
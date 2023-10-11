import UserPage from './pages/user';
import HomePage from './pages/home';
import SearchingPage from './pages/searching';
import * as Const from './const';

//equivalent use as if statement to receive the input from user to select pages
function Body({selectedPage}) {
  return (
      <div>
        {selectedPage === Const.USER && <UserPage/>}
        {selectedPage === Const.HOME && <HomePage/>}
        {selectedPage === Const.SEARCHING && <SearchingPage/>}
      </div>
  );
}

export default Body;
import HomePage from './pages/home';
import ShoppingPage from './pages/shopping';
import * as Const from './const';

//equivalent use as if statement to receive the input from user to select pages
function Body({selectedPage}) {
  return (
      <div>
        {selectedPage === Const.HOME && <HomePage/>}
        {selectedPage === Const.SHOPPING && <ShoppingPage/>}
      </div>
  );
}

export default Body;
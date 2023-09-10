import HomePage from './pages/home'
import ShoppingPage from "./pages/shopping";
import * as Const from "./const"
function Body ({ selectedPage }) {
    return (
        <div>
            {selectedPage === Const.HOME && <HomePage/>}
            {selectedPage === Const.SHOPPING && <ShoppingPage/>}
        </div >
    )
}
export default Body
import HomePage from './pages/home'
import ShoppingPage from "./pages/shopping";
function Body ({ selectedPage }) {
    return (
        <div>
            {selectedPage === 'home' && <HomePage/>}
            {selectedPage === 'shopping' && <ShoppingPage/>}
        </div >
    )
}
export default Body
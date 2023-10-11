// <<<<<<< HEAD
import React, {useEffect, useState} from 'react';

function HomePage() {
  return (
    <div>
      This is Home Page
    </div>
  )
// =======
// import {useContext, useState} from 'react';
// import * as Const from '../const';
// import UpdateUserInfo from '../actions/updateUserInfo';
// import PostItem from '../actions/postItem';
// import MySellingItems from "./mySellingItems";
// import UserContext from '../contexts/userContext';
// import SearchPanel from './searchPanel';  // Import the SearchPanel component
// import Logout from '../userPanel/logout';
//
// function HomePage() {
//   const [state, setState] = useState(Const.CLOSE);
//   const {contextUsername, contextUserID} = useContext(UserContext);
//
//   // Mock items array, replace it with real item data
//   const items = ['item1', 'item2', 'item3', 'item4'];
//
//   function handleCloseUserStateClick() {
//     setState(Const.CLOSE);
//   }
//
//   // Define a new function handleLogoutClose to change state upon logout
//   function handleLogoutClose() {
//     setState(Const.CLOSE);
//     // Optionally, add more logic here to handle logout, e.g., redirect, display message, etc.
//   }
//
//   return (
//       <div>
//         {/* Include SearchPanel component and pass items array */}
//         <SearchPanel items={items} />
//
//         {state === Const.CLOSE && contextUserID !== '' && <div>
//           <button onClick={() => setState(Const.UPDATEUSERINFO)}>Update User Info</button>
//           <button onClick={() => setState(Const.POSTITEM)}>Post Item</button>
//           <button onClick={() => setState(Const.MYSELLINGITEMS)}>My selling items</button>
//           <button onClick={() => setState(Const.LOGOUT)}>Logout</button> {/* Add Logout Button */}
//         </div>}
//         {state === Const.UPDATEUSERINFO && <UpdateUserInfo onClose={handleCloseUserStateClick}/>}
//         {state === Const.POSTITEM && <PostItem onClose={handleCloseUserStateClick}/>}
//         {state === Const.MYSELLINGITEMS && <MySellingItems onClose={handleCloseUserStateClick}/>}
//         {state === Const.LOGOUT && <Logout onClose={handleLogoutClose}/>} {/* Pass handleLogoutClose function */}
//       </div>
// >>>>>>> 0e56097faf1f6f53f2b8f5da60300dc86e2dd94e
 // );
  // const [items, setItems] = useState([]);
  // // const [categoryFilter, setCategoryFilter] = useState('');
  // // const [minPriceFilter, setMinPriceFilter] = useState('');
  // // const [maxPriceFilter, setMaxPriceFilter] = useState('');

  // useEffect(() => {
  //   const fetchItems = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8080/items');
  //       if (!response.ok) {
  //         const data = await response.json();
  //         throw new Error(data.message || 'Network response was not ok');
  //       }
  //       const data = await response.json();
  //       setItems(data);
  //     } catch (error) {
  //       console.log('There was a problem with the fetch operation:',
  //           error.message);
  //     }
  //   };

  //   fetchItems();
  // }, []);

  // // const filteredItems = items
  // //   .filter(item => !categoryFilter || item.category === categoryFilter)
  // //   .filter(item => !minPriceFilter || item.price >= minPriceFilter)
  // //   .filter(item => !maxPriceFilter || item.price <= maxPriceFilter);

  // return (
  //     <div>
  //       <div>
  //       <label>
  //         Category:
  //         <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
  //           <option value="">All</option>
  //           {/* categories */}
  //         </select>
  //       </label>
  //       <label>
  //         Min Price:
  //         <input 
  //           type="number" 
  //           value={minPriceFilter} 
  //           onChange={e => setMinPriceFilter(e.target.value)} 
  //         />
  //       </label>
  //       <label>
  //         Max Price:
  //         <input 
  //           type="number" 
  //           value={maxPriceFilter} 
  //           onChange={e => setMaxPriceFilter(e.target.value)} 
  //         />
  //       </label>
  //     </div>
  //       <ul>
  //         {filteredItems.map(item => (
  //             <li key={item.id}>
  //               <strong>Name:</strong> {item.name} <br/>
  //               <strong>Owner:</strong> {item.owner} <br/>
  //               <strong>Description:</strong> {item.description} <br/>
  //               <strong>Category:</strong> {item.category} <br/>
  //               <strong>Status:</strong> {item.status} <br/>
  //               <strong>Price:</strong> ${item.price} <br/>
  //             </li>
  //         ))}
  //       </ul>
  //     </div>
  // );
}

export default HomePage;

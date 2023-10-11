import React, {useEffect, useState} from 'react';

function Filter({onCancel, onSubmit}) {

  const [items, setItems] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [minPriceFilter, setMinPriceFilter] = useState('');
  const [maxPriceFilter, setMaxPriceFilter] = useState('');

  function onFilterSubmit(){
    var filterData = {
        "categories" : categoryFilter,
        "minPrice" : minPriceFilter,
        "maxPrice" : maxPriceFilter
    }
    onSubmit(filterData)
  }

//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/items');
//         if (!response.ok) {
//           const data = await response.json();
//           throw new Error(data.message || 'Network response was not ok');
//         }
//         const data = await response.json();
//         setItems(data);
//       } catch (error) {
//         console.log('There was a problem with the fetch operation:',
//             error.message);
//       }
//     };

//     fetchItems();
//   }, []);

  // const filteredItems = items
  //   .filter(item => !categoryFilter || item.category === categoryFilter)
  //   .filter(item => !minPriceFilter || item.price >= minPriceFilter)
  //   .filter(item => !maxPriceFilter || item.price <= maxPriceFilter);

  return (
      <div className='filter'>
        <div className='filter-setting'>
            <label>
            Category:
            <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
                <option value="">All</option>
                {/* categories */}
            </select>
            </label>
            <label>
            Min Price:
            <input 
                type="number" 
                value={minPriceFilter} 
                onChange={e => setMinPriceFilter(e.target.value)} 
            />
            </label>
            <label>
            Max Price:
            <input 
                type="number" 
                value={maxPriceFilter} 
                onChange={e => setMaxPriceFilter(e.target.value)} 
            />
            </label>
        </div>
        <div className="filter-panel">
            <button className="cancel-button" onClick={() => onCancel()}>Cancel</button>
            <button className="submit-button" onClick={() => onFilterSubmit()}>Submit</button>
        </div>
      </div>
  );
}

export default Filter;

import React, { useState, useEffect } from 'react'

const SearchPanel = ({ items = [] }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const handleChange = event => {
    setSearchTerm(event.target.value)
  }

  const handleSearch = async () => {
    // Uncomment below lines once backend is ready
    /*
    try {
      const response = await fetch('http://www.dijkstraliu.com:5000/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchTerm }),
      });
      const data = await response.json();
      setSearchResults(data.results); // assuming the response contains a results array
    } catch (error) {
      console.error('Failed to fetch search results:', error);
    }
    */

    // Remove below line once backend is ready
    mockSearch()
  }

  // Simulated function to mock backend search results
  const mockSearch = () => {
    const results = items.filter(item =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setSearchResults(results)
  }

  // Uncomment below useEffect hook once backend interaction is ready
  /*
  useEffect(() => {
    handleSearch();
  }, [searchTerm]);
  */

  return (
    <div>
      <input
        type="text"
        placeholder="Search by item name"
        value={searchTerm}
        onChange={handleChange}
      />
      <button onClick={handleSearch}>Search</button> {/* Added Search button */}
      <ul>
        {searchResults.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default SearchPanel

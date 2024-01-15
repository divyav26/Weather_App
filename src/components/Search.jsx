import React from 'react'
import '../App.css';

const Search = ({search, setSearch, handleSearch}) => {
  return (
    <div className='search-engine'>
      <input type='text' className='search' placeholder='City Name'
       name='search' value={search}
       onChange={(e)=>setSearch(e.target.value)} />
       <button className='btn' onClick={handleSearch}>Search Weather</button>
    </div>
  )
}

export default Search

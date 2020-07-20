import React from 'react';
import { useDispatch } from 'react-redux';
import { searchClients } from '../../actions/clientsList';

import './styles.css';

function Search() {
  const dispatch = useDispatch();

  const handleSearch = e => {
    const name = e.target.value;

    dispatch(searchClients(name.toLowerCase()));
  }

  return (
    <div className="search">
      <div className="search__field">
        <input 
          type="text" 
          placeholder="Buscar por nome..."
          onChange={handleSearch}
          className="search__input"
        />
      </div>
    </div>
  );
}

export default Search;
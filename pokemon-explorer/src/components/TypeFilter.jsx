import React, { useEffect, useState } from 'react';
import './TypeFilter.css';

function TypeFilter({ setSelectedType }) {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/type')
      .then((res) => res.json())
      .then((data) => setTypes(data.results));
  }, []);

  return (
    <div className="type-filter">
      <select onChange={(e) => setSelectedType(e.target.value)}>
        <option value=" ">All Types </option>
        {types.map((type) => (
          <option key={type.name} value={type.name}>
            {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TypeFilter;

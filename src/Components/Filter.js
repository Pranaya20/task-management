import React, { useState } from 'react';

const Filter = ({ setSelectedStatus }) => {
  const [selectedOption, setSelectedOption] = useState('');
  
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    setSelectedStatus(selectedValue); 
  };

  return (
    <div className="filter-container"> 
    <label>Filter</label>   
      <select
        id="dropdown"
        className="form-control"
        value={selectedOption}
        onChange={handleSelectChange}
      >
        <option value="All">All</option>
        <option value="Completed">Completed</option>
        <option value="Pending">Pending</option>
      </select>
    </div>
  );
}

export default Filter;
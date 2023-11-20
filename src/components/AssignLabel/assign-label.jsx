import React, { useState, useEffect, useRef } from 'react';
import './index.css'; 

const AssignLabel = ({ labels, onSelect, display }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredLabels, setFilteredLabels] = useState();
  const [showDropdown, setShowDropdown] = useState(false);

  const inputRef = useRef();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    // console.log(value, labels,"value, Labels");
    const filtered = labels.filter((label) =>
      label.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredLabels(filtered);
  };

  const handleSelectLabels = (label) => {
    onSelect(label);
    setInputValue('');
    setFilteredLabels([]);
  };

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };


  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="autocomplete" ref={inputRef}>
      <input
        type="text"
        className='label-input'
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setShowDropdown(true)}
        placeholder="Type to search..."
      />
      {showDropdown && <ul className={`suggestion-list ${display}`}>
        {filteredLabels && filteredLabels.map((label, index) => (
          <li key={index} onClick={() => handleSelectLabels(label)}>
            {label}
          </li>
        ))}
      </ul>}
    </div>
  );
};

export default AssignLabel;

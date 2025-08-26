import React, { useState, useEffect } from 'react';

const SelectState = ({ value, onChange }) => {
  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
    "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep", "Delhi", "Puducherry"
  ];

  const [query, setQuery] = useState(value || '');
  const [filteredStates, setFilteredStates] = useState([]);

  useEffect(() => {
    if (value !== query) {
      setQuery(value); // keep internal input in sync with external value
    }
  }, [value]);

  const handleInputChange = (e) => {
    const q = e.target.value;
    setQuery(q);
    const matches = states.filter((state) =>
      state.toLowerCase().includes(q.toLowerCase())
    );
    setFilteredStates(matches);
  };

  const handleSelect = (state) => {
    onChange({ target: { name: "state", value: state } });
    setQuery(state);
    setFilteredStates([]);
  };

  return (
    <div className="relative">
      <input
        type="text"
        name="state"
        value={query}
        onChange={handleInputChange}
        className="border border-gray-300 rounded p-1 w-full mt-2"
        placeholder="Search state"
        autoComplete="off"
      />
      {filteredStates.length > 0 && query && (
        <ul className="absolute z-10 bg-white border border-gray-300 mt-1 w-full max-h-40 overflow-y-auto rounded shadow">
          {filteredStates.map((state) => (
            <li
              key={state}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(state)}
            >
              {state}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectState;

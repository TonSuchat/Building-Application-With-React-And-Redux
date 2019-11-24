import React from "react";
import PropTypes from "prop-types";

const SearchInput = ({ name, onChange, placeholder, value }) => {
  return (
    <div className="row mb-2">
      <div className="col-12">
        <input
          type="text"
          name={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

SearchInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired
};

export default SearchInput;

import React from 'react';
import PropTypes from 'prop-types';

export default function Input(
  { textLabel, value, type, className, onChange, inputName },
) {
  return (
    <label htmlFor={ className }>
      {/* { textLabel } */}
      <input
        id={ className }
        type={ type }
        className={ className }
        value={ value }
        data-testid={ className }
        onChange={ onChange }
        name={ inputName }
        placeholder={ textLabel }
      />
    </label>
  );
}

Input.propTypes = {
  className: PropTypes.string.isRequired,
  inputName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  textLabel: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

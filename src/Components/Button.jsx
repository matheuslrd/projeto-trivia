import React from 'react';
import PropTypes from 'prop-types';

export default function Button(
  { className, dataTestId, onClick, value, textButton, disabled },
) {
  return (
    <button
      type="button"
      className={ className }
      data-testid={ dataTestId }
      onClick={ onClick }
      value={ value }
      disabled={ disabled }
    >
      { textButton }
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  dataTestId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  textButton: PropTypes.string.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
  className: null,
  value: null,
};

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Errors.scss';

export const Errors = ({ errors }) => (
  <div className="errors">
    {errors && errors.map((err, index) => (
      <div key={`error${index}`}>{err.toString()}</div>
    ))}
  </div>
);

Errors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.shape({
    toString: PropTypes.func.isRequired
  }))
};

export default connect(
  ({ app: { errors }}) => ({
    errors
  })
)(Errors);

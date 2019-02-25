import React from 'react';
import { connect } from 'react-redux';

export default WrappedComponent => {
  const mapStateToProps = state => {
    const message = state.errors.errors.join('\n');
    if (!message) return {};
    return {
      error: <div className="alert alert-danger">{message}</div>
    };
  };
  return connect(mapStateToProps)(WrappedComponent);
};

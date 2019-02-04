import React, { Component } from 'react';
import { connect } from 'react-redux';

const propTypes = {};

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Boilerplate</h1>
        <p className="text-muted">
          Everything you need to <strong>create an awesome</strong> project
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {};
};

Home.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(Home);

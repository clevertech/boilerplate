import React, { Component } from 'react';
import { connect } from 'react-redux';

const propTypes = {};

class Home extends Component {
  render() {
    return (
      <section className="hero is-medium is-primary is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Welcome to Clevertech's Boilerplate</h1>
            <p className="subtitle">
              Everything you need to <strong>create an awesome</strong> project
            </p>
          </div>
        </div>
      </section>
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

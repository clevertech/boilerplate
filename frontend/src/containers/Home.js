import React, { Component } from 'react';
import { connect } from 'react-redux';

const propTypes = {};

class Home extends Component {
  render() {
    return (
      <section className="hero is-primary is-fullheight">
        <div className="hero-body">
          <p className="title">Boilerplate</p>
          <p className="subtitle">
            &nbsp; Everything you need to <strong>create an awesome</strong> project
          </p>
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

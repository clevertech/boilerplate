import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import { actions } from '../../redux/modules/products';

const propTypes = {};

class Products extends Component {
  componentWillMount() {
    if (this.props.products.records.length === 0) this.props.productsRefresh();
  }

  render() {
    const { products } = this.props;

    return (
      <div>
        <div className="hero is-link">
          <div className="hero-body">
            <div className="container">
              <h2 className="title">Products</h2>
            </div>
          </div>
        </div>
        <section className="section">
          <div className="container">
            <table className="table is-bordered is-bordered is-fullwidth">
              <thead>
                <tr>
                  <th>Product name</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {products.records.map(({ name, price, quantity, description, id }) => (
                  <tr key={id}>
                    <td>{name}</td>
                    <td>{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = ({ products }, ownProps) => ({ products });
const mapDispatchToProps = (dispatch, ownProps) => ({
  ...bindActionCreators(actions, dispatch)
});

Products.propTypes = propTypes;
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Products)
);

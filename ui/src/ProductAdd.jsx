import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, FormControl, FormGroup, ControlLabel, Button,
 } from 'react-bootstrap';
export default class ProductAdd extends React.Component {
    constructor() {
      super();
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleSubmit(e) {
      e.preventDefault();
      const form = document.forms.productAdd;
      const product = {
      // eslint-disable-next-line max-len
        name: form.name.value, price: form.price.value?form.price.value.substring(1):"", category: form.category.value, imageURL: form.imageURL.value,
      };
      // eslint-disable-next-line react/destructuring-assignment
      const { createProduct } = this.props;
      createProduct(product);
      form.name.value = '';
      form.price.value = '$';
      form.category.value = '';
      form.imageURL.value = '';
    }
  
    render() {
      return (

        <Form  name="productAdd" onSubmit={this.handleSubmit}>
          <div>
            <h2>Add a new product to inventory</h2>
              <FormGroup>
                <ControlLabel>Name</ControlLabel>
                {' '}
                <FormControl type="text" name="name" />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Price</ControlLabel>
                {' '}
                <FormControl type="text" name="price" defaultValue="$"/>
              </FormGroup>

              <FormGroup>
              <ControlLabel>Category</ControlLabel>
              <FormControl componentClass="select" name="category">
                <option value="Shirts">Shirts</option>
                <option value="Jeans">Jeans</option>
                <option value="Jackets">Jackets</option>
                <option value="Sweaters">Sweaters</option>
                <option value="Accessories">Accessories</option>
            </FormControl>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Image URL</ControlLabel>
                {' '}
              <FormControl type="text" name="imageURL" />
            </FormGroup>
              {' '}
            <div class="d-grid gap-2 col-6 mx-auto">
            <Button bsStyle="primary" type="submit">Add Product</Button>
            </div>
          </div>
  
        </Form>
      );
    }
  }

  ProductAdd.propTypes = {
    createProduct: PropTypes.func.isRequired,
  };
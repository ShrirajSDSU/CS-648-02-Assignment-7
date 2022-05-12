import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  NavItem, Glyphicon, Modal, Form, FormGroup, FormControl, ControlLabel,
  Button, ButtonToolbar, Tooltip, OverlayTrigger,
} from 'react-bootstrap';

import graphQLFetch from './graphql.js';

class ProductAddNavItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  showModal() {
    this.setState({ showing: true });
  }

  hideModal() {
    this.setState({ showing: false });
  }




  async handleSubmit(e) {
    e.preventDefault();
    this.hideModal();
    const form = document.forms.addprod;
    const product = {
      // eslint-disable-next-line max-len
        name: form.name.value, price: form.price.value, category: form.category.value, imageURL: form.imageURL.value,
      };
      const query = `mutation addprod($product: productInput!) {
        addprod(product: $product) {
            id
        }
      }`;
    
        const data = await graphQLFetch(query, {product});
        console.log(data);
        if (data) {
          const { history } = this.props;
          history.push(`/edit/${data.addprod.id}`);
        }
      }
    
      

  render() {
    const { showing } = this.state;
    return (
      <React.Fragment>
        <NavItem onClick={this.showModal}>
          <OverlayTrigger
            placement="left"
            delayShow={1000}
            overlay={<Tooltip id="add-product">Add Product</Tooltip>}
          >
            <Glyphicon glyph="plus" />
          </OverlayTrigger>
        </NavItem>
        <Modal keyboard show={showing} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form name="addprod" onSubmit={this.handleSubmit}>
              <FormGroup>
                <ControlLabel>Category:</ControlLabel>
                <FormControl
                  componentClass="select"
                  name="category"
                  autoFocus
                >
                <option value="Shirts">Shirts</option>
                <option value="Jeans">Jeans</option>
                <option value="Jackets">Jackets</option>
                <option value="Sweaters">Sweaters</option>
                <option value="Accessories">Accessories</option>
                </FormControl>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Name</ControlLabel>
                <FormControl name="name"/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Price</ControlLabel>
                <FormControl name="price" />
              </FormGroup>

              <FormGroup>
                <ControlLabel>Image URL</ControlLabel>
                <FormControl name="imageURL"/>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <ButtonToolbar>
              <Button
                type="button"
                bsStyle="primary"
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
              <Button bsStyle="link" onClick={this.hideModal}>Cancel</Button>
            </ButtonToolbar>
          </Modal.Footer>
        </Modal>

      </React.Fragment>
    );
  }
}

export default withRouter(ProductAddNavItem);
import React from 'react';
import { Link } from 'react-router-dom';
import graphql from './graphql.js';
import NumInput from './NumInput.jsx';
import TextInput from './TextInput.jsx';
import {
    Col, Panel, Form, FormGroup, FormControl, ControlLabel,
    ButtonToolbar, Button,
   } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
export default class productEdit extends React.Component {
    constructor() {
    super();
    this.state = {
    product: {},
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
    this.loadData();
    }
    componentDidUpdate(prevProps) {
    const { match: { params: { id: prevId } } } = prevProps;
    const { match: { params: { id } } } = this.props;
    if (id !== prevId) {
    this.loadData();
    }
    }
    onChange(event) {
    const { name, value } = event.target;
    this.setState(prevState => ({
    product: { ...prevState.product, [name]: value },
    }));
    }
    async handleSubmit(e) {
    e.preventDefault();
    const { product } = this.state;
    console.log(product); 
    const query = `mutation updateProduct($product: ProductUpdateInput!) {
                updateProduct(product: $product) {
                    id name price category
                    imageURL
                }
              }`;
    const data = await graphql(query, { product });
     if (data) {
        this.setState({ product: data.updateProduct });
        alert('Updated product successfully'); // eslint-disable-line no-alert
    }

 }
    async loadData() {
    const query = `query product($id: Int!) {
    product(id: $id ) {
    id name price category
    imageURL
}
}`;
const { match: { params: { id } } } = this.props;
const data = await graphql(query, { id });
console.log(data);
if (data) {
const { product } = data;
product.name = product.name != null ? product.name : '';
product.price = product.price != null ? product.price : '';
product.category = product.category != null ? product.category : '';
product.imageURL = product.imageURL != null ? product.imageURL : '';
this.setState({ product });
} else {
this.setState({ product: {} });
}
}
render() {
const { product: { id } } = this.state;
const { match: { params: { id: propsId } } } = this.props;
if (id == null) {
if (propsId != null) {
return <h3>{`Product with ID ${propsId} not found.`}</h3>;
}
return null;
}
const { product: { name, category, price, imageURL } } = this.state;


return (
<section>
<Panel>
<Panel.Heading>
<Panel.Title>{`Editing Product: ${id}`}</Panel.Title>
</Panel.Heading>
<Panel.Body>
<Form horizontal onSubmit={this.handleSubmit}>
<FormGroup>
<Col componentClass={ControlLabel} sm={3}>Name</Col>
 <Col sm={9}>
 <FormControl 
 componentClass={TextInput}
 name= "name"
 value={name}
 onChange={this.onChange}
 key={id}
 />
 </Col>
 </FormGroup>
 <FormGroup>
 <Col componentClass={ControlLabel} sm={3}>Category</Col>
 <Col sm={9}>
 <FormControl
 componentClass="select"
 name="category"
 value={category}
 onChange={this.onChange}
 >
 <option value="Shirts">Shirts</option>
 <option value="Jeans">Jeans</option>
 <option value="Jackets">Jackets</option>
 <option value="Sweaters">Sweaters</option>
 <option value="Accessories">Accessories</option>
 </FormControl>
 </Col>
 </FormGroup>
 <FormGroup>
 <Col componentClass={ControlLabel} sm={3}>Price</Col>
 <Col sm={9}>
 <FormControl
 componentClass={NumInput}
 name="price"
 value={price}
 onChange={this.onChange}
 key={id}
 />
 </Col>
 </FormGroup>
 <FormGroup>
<Col componentClass={ControlLabel} sm={3}>ImageURL</Col>
 <Col sm={9}>
 <FormControl 
 componentClass={TextInput}
 name= "imageURL"
 value={imageURL}
 onChange={this.onChange}
 key={id}
 />
 </Col>
 </FormGroup>
 <FormGroup>
 <Col smOffset={3} sm={6}>
 <ButtonToolbar>
 <Button bsStyle="primary" type="submit">Submit</Button>
 <LinkContainer to="/products">
 <Button bsStyle="link">Back</Button>
 </LinkContainer>
 </ButtonToolbar>
 </Col>
 </FormGroup>
</Form>
</Panel.Body>
<Panel.Footer>
<Link to={`/edit/${id - 1}`}>Prev</Link>
 {' | '}
 <Link to={`/edit/${id + 1}`}>Next</Link>
</Panel.Footer>

</Panel>
</section>
 );
 }
}
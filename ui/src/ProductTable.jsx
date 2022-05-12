import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Glyphicon, Tooltip, OverlayTrigger, Table,} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function ProductTable({products, deleteProduct}) {
    // eslint-disable-next-line max-len
    const productRows = products.map(product => <ProductRow key={product.id} product={product} deleteProduct={deleteProduct} index={product.id} />);
    const borderedStyle = { border: '1px solid black', padding: 6 };
    return (
      <Table bordered condensed hover responsive>
        <thead>
  
          <tr>
            <th style={borderedStyle}>Name</th>
            <th style={borderedStyle}>Price</th>
            <th style={borderedStyle}>Category</th>
            {/* <th style={borderedStyle}>ImageURL</th> */}
            <th style={borderedStyle}>Action</th>

          </tr>
        </thead>
        <tbody>
          {productRows}
        </tbody>
      </Table>
    );
  }
  
  function ProductRow({product, deleteProduct, index}) {
    const borderedStyle = { border: '1px solid black', padding: 4 };
    const deleteTooltip = (
      <Tooltip id="delete-tooltip" placement="top">Delete Product</Tooltip>
      );
    const editTooltip = (
      <Tooltip id="edit-tooltip" placement="top">Edit Product</Tooltip>
      );
    const viewTooltip = (
      <Tooltip id="view-tooltip" placement="top">View Product</Tooltip>
    );
    function onDelete(e) {
      e.preventDefault();
      deleteProduct(index);
      }
   // const { product } = props;
    return (
      <tr>
        <td style={borderedStyle}>{product.name}</td>
        <td style={borderedStyle}>
          $
          {product.price}
        </td>
        <td style={borderedStyle}>{product.category}</td>
        {/* <td style={borderedStyle}><Link to={`/image/${encodeURIComponent(product.imageURL)}`}>View</Link></td> */}
        {/* <td style={borderedStyle}><a href={product.imageURL} target="_blank">View</a></td> */}
        {/* <td style={borderedStyle}> <Link to={`/edit/${product.id}`}>Edit</Link></td> */}
        {/* <td style={borderedStyle}><Button bsStyle="primary" type="button" onClick={() => { deleteProduct(index); }}>Delete</Button></td> */}
        <td style={borderedStyle}>
        <LinkContainer to={`/image/${encodeURIComponent(product.imageURL)}`}>
          <OverlayTrigger delayShow={1000} overlay={viewTooltip}>
          <Button bsSize="xsmall">
          <Glyphicon glyph="th-large" />
          </Button>
          </OverlayTrigger>
        </LinkContainer>
          {' '}
          <LinkContainer to={`/edit/${product.id}`}>
          <OverlayTrigger delayShow={1000} overlay={editTooltip}>
          <Button bsSize="xsmall">
          <Glyphicon glyph="edit" />
          </Button>
          </OverlayTrigger>
          </LinkContainer>
          {' '}
          <OverlayTrigger delayShow={1000} overlay={deleteTooltip}>
          <Button bsSize="xsmall" onClick={onDelete}>
          <Glyphicon glyph="trash" />
          </Button>
          </OverlayTrigger>
        </td>
      </tr>
    );
  }
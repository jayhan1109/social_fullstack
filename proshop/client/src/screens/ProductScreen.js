import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Button, Card, Col, FormControl, Image, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import Rating from "../components/Rating";
import {useDispatch, useSelector} from "react-redux";
import {getProductDetail} from "../reducers/productDetailReducer";
import Loader from "../components/Loader";
import Message from "../components/Message";


const ProductScreen = ({match, history}) => {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const productDetail = useSelector(state => state.productDetail);
  const {product, loading, error} = productDetail;

  useEffect(() => {
    dispatch(getProductDetail(match.params.id));
  }, [match.params.id, dispatch]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>Go Back</Link>
      {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid/>
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h3>{product.name}</h3>
              </ListGroupItem>
              <ListGroupItem>
                <Rating text={`${product.numReviews} reviews`} value={product.rating}/>
              </ListGroupItem>
              <ListGroupItem>
                Price: ${product.price}
              </ListGroupItem>
              <ListGroupItem>
                {product.description}
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <Row>
                    <Col>
                      Price:
                    </Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>
                      Status:
                    </Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </Col>
                  </Row>
                </ListGroupItem>
                {product.countInStock > 0 && (
                  <ListGroupItem>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <FormControl as='select' value={qty} onChange={e => setQty(e.target.value)}>
                          {[...Array(product.countInStock).keys()].map(x => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </FormControl>
                      </Col>
                    </Row>
                  </ListGroupItem>
                )}
                <ListGroupItem>
                  <Button onClick={addToCartHandler} className='btn-block' type='button'
                          disabled={product.countInStock === 0}>
                    Add To Cart
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      }
    </>
  );
};

export default ProductScreen;

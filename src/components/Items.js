import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa';
import classes from './Items.module.css';

const Items = ({ item, index, setCounter }) => {
  setCounter(index + 1);
  const addToCard = (e) => {
    e.preventDefault();
    return alert('Product added to cart');
  };
  const addToFavorite = (e) => {
    e.preventDefault();
    return alert('Product added to favorite');
  };
  return (
    <Col xs={6} lg={4} md={6} className="mb-4">
      <Card className={classes.card}>
        <div className={classes.badge}>
          {item.rating}
          <FaStar />
        </div>
        <Card.Img
          variant="top"
          src={item.images[0]}
          className={classes.image}
        />
        <Card.Body className={classes['card-body']}>
          <span className={`${classes['product-category']} mb-1`}>
            {item.category}
          </span>
          {item.title.length <= 16 ? (
            <h5>
              <a href="#title" className={classes.header}>
                {item.title + '...'}
              </a>
            </h5>
          ) : (
            <h5>
              <a href="#title" className={classes.header}>
                {item.title.substr(0, 16) + '\u2026'}
              </a>
            </h5>
          )}
          {item.description.length <= 20 ? (
            <p>{item.description + '...'}</p>
          ) : (
            <p>{item.description.substr(0, 20) + '\u2026'}</p>
          )}
          <Row className={classes.row}>
            <Col>
              {index % 3 === 0 ? (
                <div className={classes['product-bottom-details']}>
                  <div className={classes['product-price']}>
                    <small>${item.price}</small>$
                    {(
                      item.price -
                      item.price * (item.discountPercentage / 100)
                    ).toFixed(0)}{' '}
                  </div>
                  <div className={classes['product-links']}>
                    <button onClick={addToFavorite}>
                      <i>{<FaHeart />}</i>
                    </button>
                    <button onClick={addToCard}>
                      <i>
                        <FaShoppingCart />
                      </i>
                    </button>
                  </div>
                </div>
              ) : (
                <div className={classes['product-bottom-details']}>
                  <div className={classes['product-price']}>${item.price}</div>
                  <div className={classes['product-links']}>
                    <button onClick={addToFavorite}>
                      <i>{<FaHeart />}</i>
                    </button>
                    <button onClick={addToCard}>
                      <i>
                        <FaShoppingCart />
                      </i>
                    </button>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Items;

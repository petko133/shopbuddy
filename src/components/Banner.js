import React from 'react';
import Container from 'react-bootstrap/Container';
import classes from './Banner.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Banner = () => {
  return (
    <div className={classes.background}>
      <Container className={classes.container}>
        <Row>
          <Col xs={11} sm={8} xl={7} className={`ms-5 mt-5`}>
            <h3>FIND THE BEST</h3>
            <h1>PRODUCTS AND NECESSITIES</h1>
            <h1>FOR YOU!</h1>
            <Button className={classes.button}>Shop Now</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Banner;

import React from 'react';
import Container from 'react-bootstrap/Container';
import classes from './Footer.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaMailBulk, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className={classes.background}>
      <Container>
        <Row>
          <Col xs={6} lg={3}>
            <h5 className="text-uppercase">Shopbuddy</h5>
            <hr></hr>
            <p>
              We offer big range of products that you can get on competitive
              prices and often with discounts!
            </p>
          </Col>
          <Col xs={6} lg={3}>
            <h5 className="text-uppercase">About</h5>
            <hr></hr>
            <ul className="p-0">
              <li className={classes['li-item']}>
                <a href="#new">New York</a>
              </li>
              <li className={classes['li-item']}>
                <a href="#careers">Careers</a>
              </li>
              <li className={classes['li-item']}>
                <a href="#mobile">Mobile</a>
              </li>
              <li className={classes['li-item']}>
                <a href="#blog">Blog</a>
              </li>
              <li className={classes['li-item']}>
                <a href="#work">How we work</a>
              </li>
            </ul>
          </Col>
          <Col xs={6} lg={3}>
            <h5 className="text-uppercase">Legal</h5>
            <hr></hr>
            <ul className="p-0">
              <li className={classes['li-item']}>
                <a href="#toc">Terms and Conditions</a>
              </li>
              <li className={classes['li-item']}>
                <a href="#tou">Terms of use</a>
              </li>
              <li className={classes['li-item']}>
                <a href="#privacy">Privacy Policy</a>
              </li>
              <li className={classes['li-item']}>
                <a href="#cookies">Cookies Configuration</a>
              </li>
              <li className={classes['li-item']}>
                <a href="#imprint">Imprint</a>
              </li>
            </ul>
          </Col>
          <Col xs={6} lg={3}>
            <h5 className="text-uppercase">Contacts</h5>
            <hr></hr>
            <ul className="p-0">
              <li className={classes['li-item']}>
                <a href="#toc">
                  <h6>
                    {' '}
                    <FaPhone /> (123)-456-789
                  </h6>
                  <h6>
                    {' '}
                    <FaMailBulk /> shopbuddy@email.com
                  </h6>
                </a>
              </li>
              <li className={classes['li-item']}>
                <a href="#tou">Mon - Fri: 9:00AM - 9:00PM</a>
              </li>
              <li className={classes['li-item']}>
                <a href="#privacy">Sat: 10:00AM - 6:00PM</a>
              </li>
              <li className={classes['li-item']}>
                <a href="#cookies">Sun: 12:00AM - 6:00PM</a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;

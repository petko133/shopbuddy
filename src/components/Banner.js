import React from 'react';
import Container from 'react-bootstrap/Container';
import classes from './Banner.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useRef } from 'react';
import { useEffect } from 'react';

const Banner = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start('visible');
    }
  }, [isInView]);

  return (
    <div ref={ref} className={classes.background}>
      <Container className={classes.container}>
        <Row>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 75 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={mainControls}
            transition={{ duration: 1, delay: 0.25 }}
          >
            <Col xs={11} sm={8} xl={7} className={`ms-5 mt-5`}>
              <h3>FIND THE BEST</h3>
              <h1>PRODUCTS AND NECESSITIES</h1>
              <h1>FOR YOU!</h1>
              <Button className={classes.button}>Shop Now</Button>
            </Col>
          </motion.div>
        </Row>
      </Container>
    </div>
  );
};

export default Banner;

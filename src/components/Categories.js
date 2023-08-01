import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import classes from './Categories.module.css';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const Categories = ({
  items,
  setCategory,
  activeSort,
  setActiveSort,
  handleChange,
  setSelectedBrands,
  setSelectedPrice,
}) => {
  const [categories, setCategories] = useState([]);

  const handleCategory = (e) => {
    setCategory(e.target.value);
    setSelectedBrands([]);
    setActiveSort('');
    setSelectedPrice('');
  };

  const handleSort = () => {
    setActiveSort('');
  };

  const uniqueCategories = () => {
    const category = items.map((item) => {
      return item.category;
    });
    let uniqueCat = new Set(category);
    uniqueCat = Array.from(uniqueCat);
    setCategories(uniqueCat);
  };

  useEffect(() => {
    if (Array.isArray(items)) {
      uniqueCategories();
    }
  }, [items]);

  return (
    <Container className={classes.container}>
      <Row className={classes['mobile-category']}>
        <Col xs={6} lg={8} className="mt-4">
          <FloatingLabel controlId="floatingInput" label="Categories">
            <Form.Select aria-label="" onChange={handleCategory}>
              <option value="">Choose a Category</option>
              {!Array.isArray(categories) ? (
                <option>Loading</option>
              ) : (
                categories.map((category) => {
                  return (
                    <option value={category} key={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  );
                })
              )}
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col xs={6} lg={4} className="mt-4">
          <FloatingLabel controlId="floatingInput" label="Sort">
            <Form.Select
              aria-label=""
              onChange={(e) => handleChange(e.target.value)}
              value={activeSort}
            >
              <option value="">Sort By</option>
              <option value="ascending">Alphabetically, A-Z</option>
              <option value="descending">Alphabetically, Z-A</option>
              <option value="high-price">Highest Price</option>
              <option value="low-price">Lowest Price</option>
            </Form.Select>
          </FloatingLabel>
        </Col>
      </Row>
      <Row className="d-none d-lg-flex">
        <Col lg={8} className="ps-0 ">
          <FloatingLabel controlId="floatingInput" label="Categories">
            <Form.Select aria-label="" onChange={handleCategory}>
              <option value="">Choose a Category</option>
              {!Array.isArray(categories) ? (
                <option>Loading</option>
              ) : (
                categories.map((category) => {
                  return (
                    <option value={category} key={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  );
                })
              )}
            </Form.Select>
          </FloatingLabel>
        </Col>
        <Col lg={4} className="pe-0">
          <FloatingLabel controlId="floatingInput" label="Sort">
            <Form.Select
              aria-label=""
              onChange={(e) => handleChange(e.target.value)}
              value={activeSort}
            >
              <option value="none">Sort By</option>
              <option value="ascending">Alphabetically, A-Z</option>
              <option value="descending">Alphabetically, Z-A</option>
              <option value="high-price">Highest Price</option>
              <option value="low-price">Lowest Price</option>
            </Form.Select>
          </FloatingLabel>
        </Col>
      </Row>
    </Container>
  );
};

export default Categories;

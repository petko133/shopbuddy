import React from 'react';
import classes from './Filter.module.css';
import { Button, Collapse, Container, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';
import { FaRegWindowClose } from 'react-icons/fa';

const Filter = ({
  category,
  items,
  selectedBrands,
  setSelectedBrands,
  setSelectedPrice,
  setRating,
  currentItems,
}) => {
  const [filters, setFilters] = useState({});
  const [open, setOpen] = useState(false);
  const [openBrand, setOpenBrand] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);
  const [openRating, setOpenRating] = useState(false);
  const [filterClass, setFilterClass] = useState('');

  const getFilters = () => {
    let allBrands;
    if (currentItems.length > 0) {
      allBrands = currentItems.map((item) => {
        return item.brand;
      });
    } else if (category) {
      const brands = items.filter((brand) => {
        if (brand.category === category) {
          return brand.brand;
        }
      });
      allBrands = brands.map((item) => {
        return item.brand;
      });
    } else {
      allBrands = items.map((item) => {
        return item.brand;
      });
    }
    let uniqueBrands = new Set(allBrands);
    uniqueBrands = Array.from(uniqueBrands);

    setFilters(uniqueBrands);
  };

  const handleBrands = (e) => {
    const alreadySelected = selectedBrands.includes(e);
    if (alreadySelected) {
      const filteredBrands = selectedBrands.filter((brand) => brand !== e);
      setSelectedBrands(filteredBrands);
    } else {
      setSelectedBrands([...selectedBrands, e]);
    }
  };

  const handlePrice = (e) => {
    setSelectedPrice(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setRating(e.target.value);
    }, 1000);
  };

  useEffect(() => {
    if (Array.isArray(items)) {
      getFilters();
    }
  }, [items, currentItems]);

  return (
    <Container className="d-flex ">
      <Button
        onClick={() => {
          setOpen(!open);
          setFilterClass('state-m-overlay--open');
        }}
        aria-controls="filter-overlay"
        aria-expanded={open}
        className={classes['overlay-button']}
        variant="outline-secondary"
      >
        <span className={classes['filter-span']}>Filter</span>
      </Button>
      <Button className={classes['overlay-button']} variant="outline-secondary">
        <a href="/" className={classes['filter-span']}>
          Reset Filter
        </a>
      </Button>
      <div
        id="filter-overlay"
        className={`${classes['open-filter']} ${classes[filterClass]}`}
      >
        <Container>
          <Button
            variant="outline-secondary"
            onClick={() => setFilterClass('')}
            className={classes['close-overlay-button']}
          >
            <span>
              <FaRegWindowClose size={'30'} />
            </span>
          </Button>
          <Form className={classes['overlay-filter-form']}>
            <Form.Label label="Filters">
              <h4>Filters</h4>
            </Form.Label>
            <Form.Group>
              <Button
                onClick={() => setOpenBrand(!openBrand)}
                aria-controls="open-brand"
                aria-expanded={openBrand}
                className={classes['overlay-buttons']}
                variant="outline-secondary"
              >
                Brands
              </Button>
              <Collapse in={openBrand}>
                <div id="open-brand">
                  <Container className={classes['filter-container']}>
                    {!Array.isArray(filters) ? (
                      <p>Loading</p>
                    ) : (
                      filters.map((brand) => {
                        return (
                          <Form.Check
                            className={classes.check}
                            value={brand}
                            key={brand}
                            label={brand}
                            type="checkbox"
                            name={brand}
                            id={brand}
                            checked={
                              selectedBrands.includes(brand) ? true : false
                            }
                            onChange={(e) => handleBrands(e.target.value)}
                          />
                        );
                      })
                    )}
                  </Container>
                </div>
              </Collapse>
              <Button
                onClick={() => setOpenPrice(!openPrice)}
                aria-controls="open-price"
                aria-expanded={openPrice}
                className={classes['overlay-buttons']}
                variant="outline-secondary"
              >
                Price
              </Button>
              <Collapse in={openPrice}>
                <div id="open-price">
                  <Form.Check
                    label="UNDER 50$"
                    value="under-50"
                    type="radio"
                    name="price"
                    id="price1"
                    onClick={handlePrice}
                  />
                  <Form.Check
                    label="50$ TO 200$"
                    value="under-200"
                    type="radio"
                    name="price"
                    id="price2"
                    onClick={handlePrice}
                  />
                  <Form.Check
                    label="200$ TO 500$"
                    value="under-500"
                    type="radio"
                    name="price"
                    id="price3"
                    onClick={handlePrice}
                  />
                  <Form.Check
                    label="500$ & ABOVE"
                    value="above-500"
                    type="radio"
                    name="price"
                    id="price4"
                    onClick={handlePrice}
                  />
                </div>
              </Collapse>
              <Button
                onClick={() => setOpenRating(!openRating)}
                aria-controls="open-rating"
                aria-expanded={openRating}
                className={classes['overlay-buttons']}
                variant="outline-secondary"
              >
                Rating
              </Button>
              <Collapse in={openRating}>
                <div id="open-rating">
                  <Form.Control
                    type="number"
                    step="0.01"
                    min="0"
                    max="5"
                    placeholder="0"
                    onChange={handleSubmit}
                  ></Form.Control>
                </div>
              </Collapse>
            </Form.Group>
          </Form>
        </Container>
      </div>
      <Form className="d-none d-lg-block">
        <Form.Label label="Filters">
          <h4>Filters</h4>
        </Form.Label>
        <Form.Group>
          <Form.Label label="Filters">
            <h5>Brands</h5>
          </Form.Label>
          <Container className={classes['filter-container']}>
            {!Array.isArray(filters) ? (
              <p>Loading</p>
            ) : (
              filters.map((brand) => {
                return (
                  <Form.Check
                    className={classes.check}
                    value={brand}
                    key={brand}
                    label={brand}
                    type="checkbox"
                    name={brand}
                    id={brand}
                    checked={selectedBrands.includes(brand) ? true : false}
                    onChange={(e) => handleBrands(e.target.value)}
                  />
                );
              })
            )}
          </Container>
          <Form.Label label="Filters">
            <h5>Price</h5>
          </Form.Label>
          <Form.Check
            label="UNDER 50$"
            value="under-50"
            type="radio"
            name="price"
            id="price1"
            onClick={handlePrice}
          />
          <Form.Check
            label="50$ TO 200$"
            value="under-200"
            type="radio"
            name="price"
            id="price2"
            onClick={handlePrice}
          />
          <Form.Check
            label="200$ TO 500$"
            value="under-500"
            type="radio"
            name="price"
            id="price3"
            onClick={handlePrice}
          />
          <Form.Check
            label="500$ & ABOVE"
            value="above-500"
            type="radio"
            name="price"
            id="price4"
            onClick={handlePrice}
          />
          <Form.Label label="Filters" className={classes.rating}>
            <h5>Rating</h5>
          </Form.Label>
        </Form.Group>
        <Form.Control
          type="number"
          step="0.01"
          min="0"
          max="5"
          placeholder="0"
          onChange={handleSubmit}
        ></Form.Control>

        <a href="/" className={classes['reset-span']}>
          <Button
            className={`d-none d-lg-block mt-3 ms-0 ${classes['reset-button']}`}
            variant="outline-secondary"
          >
            Reset Filter
          </Button>
        </a>
      </Form>
    </Container>
  );
};

export default Filter;

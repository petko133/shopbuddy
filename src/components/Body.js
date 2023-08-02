import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import classes from './Body.module.css';
import Items from './Items';
import ShopContext from '../store/shop-context';
import { useState, useMemo, useEffect, useContext, useRef } from 'react';
import Filter from './Filter';
import Categories from './Categories';
import { Button } from 'react-bootstrap';
import { motion, useInView, useAnimation } from 'framer-motion';

const itemsPerLoad = 9;

const isDataSelected = (item, selectedItems, itemKey) => {
  return !selectedItems.length || selectedItems.includes(item[itemKey]);
};

const isPriceSelected = (item, selectedItems, itemKey) => {
  if (selectedItems === 'under-50') {
    if (item.price < 50) {
      return item;
    }
  } else if (selectedItems === 'under-200') {
    if (item.price >= 50 && item.price < 200) {
      return item;
    }
  } else if (selectedItems === 'under-500') {
    if (item.price >= 200 && item.price < 500) {
      return item;
    }
  } else if (selectedItems === 'above-500') {
    if (item.price >= 500) {
      return item;
    }
  } else {
    return item;
  }
};

const isRatingSelected = (item, selectedItems) => {
  if (selectedItems) {
    if (selectedItems <= item.rating) {
      return item;
    }
  } else {
    return item;
  }
};

const Body = () => {
  const [loading, setLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(itemsPerLoad);
  const [counter, setCounter] = useState(0);
  const [items, setItems] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const { data } = useContext(ShopContext);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState('');
  const [rating, setRating] = useState(0);
  const [openFilter, setOpenFilter] = useState('');

  //ANIMATIONS
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const filterControls = useAnimation();
  const itemsControl = useAnimation();

  useEffect(() => {
    if (isInView) {
      filterControls.start('visible');
      itemsControl.start('visible');
    }
  }, [isInView]);

  // LOAD MORE //
  const handleLoadMore = () => {
    setLoadMore(loadMore + itemsPerLoad);
  };
  // CATEGORY AND SORT
  const handleCategory = () => {
    if (!category) {
      setCurrentItems(items);
    } else {
      const selectedCategoryItems = items.filter((item) => {
        return item.category === category;
      });
      setCurrentItems(selectedCategoryItems);
    }
  };

  const compare = (a, b, ascendingOrder) => {
    if (a < b) {
      return ascendingOrder ? -1 : 1;
    }
    if (a > b) {
      return ascendingOrder ? 1 : -1;
    }
    return 0;
  };

  const handleChange = (value) => {
    if (value === 'none') {
      setSort(value);
    } else {
      setSort(value);
      let toType, toAscending;
      switch (value) {
        case 'ascending':
          toType = true;
          toAscending = true;
          break;
        case 'descending':
          toType = true;
          toAscending = false;
          break;
        case 'low-price':
          toType = false;
          toAscending = true;
          break;
        case 'high-price':
          toType = false;
          toAscending = false;
          break;
      }
      let current;
      if (currentItems.length === 0) {
        current = items;
      } else {
        current = currentItems;
      }
      current.sort((a, b) =>
        toType
          ? compare(a.title, b.title, toAscending)
          : compare(a.price, b.price, toAscending)
      );
      setCurrentItems([...current]);
    }
  };
  // FILTERS
  const filteredItems = useMemo(() => {
    if (currentItems.length > 0) {
      return currentItems.filter((item) => {
        return (
          isDataSelected(item, selectedBrands, 'brand') &&
          isPriceSelected(item, selectedPrice, 'price') &&
          isRatingSelected(item, rating)
        );
      });
    } else {
      if (Array.isArray(items)) {
        return items.filter((item) => {
          return (
            isDataSelected(item, selectedBrands, 'brand') &&
            isPriceSelected(item, selectedPrice, 'price') &&
            isRatingSelected(item, rating)
          );
        });
      }
    }
  }, [currentItems, selectedBrands, selectedPrice, items, rating]);

  useEffect(() => {
    setItems(data);
  }, [data]);

  useEffect(() => {
    setLoading(true);
    handleCategory();
    setLoading(false);
  }, [category]);

  return (
    <Container className={`pt-5 ${classes.container}`}>
      <Row>
        <Col ref={ref} lg={3}>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 75 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={filterControls}
            transition={{ duration: 1, delay: 0.25 }}
          >
            <Filter
              items={items}
              currentItems={currentItems}
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              selectedPrice={selectedPrice}
              setSelectedPrice={setSelectedPrice}
              setRating={setRating}
              category={category}
            />
          </motion.div>
        </Col>
        <Col lg={9}>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 75 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={filterControls}
            transition={{ duration: 1, delay: 0.25 }}
          >
            <Row>
              <Container>
                <Categories
                  setOpenFilter={setOpenFilter}
                  openFilter={openFilter}
                  Filter={<Filter />}
                  items={items}
                  currentItems={currentItems}
                  setSelectedBrands={setSelectedBrands}
                  selectedPrice={selectedPrice}
                  setSelectedPrice={setSelectedPrice}
                  setCategory={setCategory}
                  activeSort={sort}
                  setActiveSort={setSort}
                  handleChange={handleChange}
                  setRating={setRating}
                  category={category}
                />
              </Container>
              {filteredItems?.length > 0 ? (
                <p className={classes.counter}>
                  Products: {counter} / {filteredItems?.length}
                </p>
              ) : (
                <p className={classes.counter}>Products: 0 / 0</p>
              )}

              {loading ? (
                <Container className="text-center">
                  <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </Container>
              ) : filteredItems?.length > 0 ? (
                filteredItems?.slice(0, loadMore).map((item, index) => {
                  return (
                    <Items
                      setCounter={setCounter}
                      key={item.id}
                      item={item}
                      index={index}
                    />
                  );
                })
              ) : (filteredItems?.length === 0 && selectedBrands.length > 0) ||
                (filteredItems?.length === 0 && selectedPrice) ? (
                <h1>No items found</h1>
              ) : (
                ''
              )}
            </Row>
          </motion.div>
          <Container className={classes.container}>
            {filteredItems?.length >= loadMore && !loading ? (
              <Button onClick={handleLoadMore} className={classes.button}>
                Load more
              </Button>
            ) : (
              ''
            )}
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Body;

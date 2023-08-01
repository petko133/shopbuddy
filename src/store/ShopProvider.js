import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ShopContext from './shop-context';

const ShopProvider = (props) => {
	const [data, setData] = useState({});

  const dataFunc = async () => {
    const response = await axios.get('https://dummyjson.com/products?limit=100');
    setData(response.data.products);
  };

  useEffect(() => {
    dataFunc();
  }, []);

	const shopContext = {
		data: data
	}
	
	return (
		<ShopContext.Provider value={shopContext}>
			{props.children}
		</ShopContext.Provider>
	);
}

export default ShopProvider;

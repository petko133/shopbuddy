import './App.css';
import React from 'react';
import ShopProvider from './store/ShopProvider';
import Header from './components/Header'
import Body from './components/Body';
import Banner from './components/Banner';
import Footer from './components/Footer';

function App() {
	return (
		<ShopProvider>
			<Header />
			<Banner />
			<Body />
			<Footer />
		</ShopProvider>
	);
}

export default App;

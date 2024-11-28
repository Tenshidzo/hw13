import React from 'react';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import CategoryFilter from './components/CategoryFilter';

const App = () => {
  return (
    <div>
      <h1>Довідник товарів</h1>
      <CategoryFilter />
      <AddProduct />
      <ProductList />
    </div>
  );
};

export default App;

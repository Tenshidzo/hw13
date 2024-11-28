import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../features/store'; // Путь к вашему состоянию
import { fetchProducts } from '../features/productSlice';
import React from 'react';
import { useEffect } from 'react';
import App from '../App';

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.product.items);
  const status = useSelector((state: RootState) => state.product.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  return (
    <div>
      <h1>Product List</h1>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <h3>{product.name}</h3>
              <p>{product.category}</p>
              <p>{product.price}</p>
              <p>{product.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList

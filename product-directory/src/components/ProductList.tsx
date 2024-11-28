import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../features/store';
import { deleteProduct, setCategory, fetchProducts } from '../features/productSlice';
import { useEffect } from 'react';
import React from 'react';

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error, selectedCategory } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const filteredItems = selectedCategory === 'All' ? items : items.filter(item => item.category === selectedCategory);

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };

  if (status === 'loading') return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div>
      <h1>Product List</h1>
      <select
        value={selectedCategory}
        onChange={(e) => dispatch(setCategory(e.target.value))}
      >
        <option value="All">All</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
        <option value="Food">Food</option>
      </select>
      <ul>
        {filteredItems.map(item => (
          <li key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.category} - ${item.price}</p>
            <p>{item.description}</p>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;

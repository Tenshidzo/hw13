import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
}

interface ProductState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedCategory: string;
}

const initialState: ProductState = {
  items: [],
  status: 'idle',
  error: null,
  selectedCategory: 'All',
};

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/posts', // Здесь нужно будет настроить свой API
});

// Создаем асинхронные действия для работы с API
export const fetchProducts = createAsyncThunk<Product[]>('products/fetchProducts', async () => {
  const response = await api.get('/products');
  return response.data;
});

// Add product
export const addProduct = createAsyncThunk<Product, Omit<Product, 'id'>>(
  'products/addProduct',
  async (newProduct) => {
    const response = await api.post('/products', newProduct);
    return response.data;
  }
);

// Delete product
export const deleteProduct = createAsyncThunk<number, number>('products/deleteProduct', async (id) => {
  await api.delete(`/products/${id}`);
  return id;
});

// Slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export const { setCategory } = productSlice.actions;
export default productSlice.reducer;

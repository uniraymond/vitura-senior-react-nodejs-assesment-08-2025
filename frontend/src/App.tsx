import { useEffect, useState } from 'react';
import { Container, CssBaseline, Typography } from '@mui/material';
import Controls from './components/Controls';
import Loading from './components/Loading';
import Empty from './components/Empty';
import ProductList from './components/ProductList';

import { useDebounce } from './hooks/useDebounce';
import { fetchProduct } from './redux/services/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './redux/store/store';
import {setQ, setView, setOnlyNew} from './redux/services/filterSlice';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {data: products, loading, error} = useSelector((state: RootState) => state.product);
  
  const {q, view, onlyNew} = useSelector((state: RootState) => state.filters);

  const [localQuery, setLocalQuery] = useState('');
  const debounceQuery = useDebounce(localQuery, 500);

  useEffect(() => {
    dispatch(setQ(debounceQuery));
  }, [debounceQuery, dispatch]);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch, q, view, onlyNew]);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>Products</Typography>

        <Controls
          q={localQuery}
          setQ={setLocalQuery}
          view={view}
          setView={(v) => dispatch(setView(v))}
          onlyNew={onlyNew}
          setOnlyNew={(o) => dispatch(setOnlyNew(o))}
        />

        {loading && <Loading />}
        {error && <div role="alert" style={{ color: 'crimson', padding: 8 }}>{error}</div>}
        {!loading && !error && products.length === 0 && <Empty />}
        {!loading && !error && products.length > 0 && <ProductList products={products} />}
      </Container>
    </>
  );
}

export default App

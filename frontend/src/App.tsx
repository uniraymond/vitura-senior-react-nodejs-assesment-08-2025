import { useEffect, useMemo, useRef, useState } from 'react';
import { Container, CssBaseline, Typography } from '@mui/material';
import Controls from './components/Controls';
import Loading from './components/Loading';
import Empty from './components/Empty';
import ProductList from './components/ProductList';
import { useDebounce } from './hooks/useDebounce';
import type { ProductsResponse, Product, UserView } from './types';
import axios from 'axios';

const App = () => {
  const [q, setQ] = useState('');
  const [view, setView] = useState<UserView>('doctor');
  const [onlyNew, setOnlyNew] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debounceQuery = useDebounce(q, 500);
  const controllerRef = useRef<AbortController | null>(null);

  const query = useMemo(() => ({
    view,
    q: debounceQuery || undefined,
    onlyNew: onlyNew || undefined,
  }), [view, debounceQuery, onlyNew]);

  useEffect(() => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get<ProductsResponse>('http://localhost:5050/products', {
          params: {view: query.view, q: query.q, new: query.onlyNew},
          signal: controller.signal,
        });
        setProducts(res.data.data);
      } catch (err) {
        if (controller.signal.aborted) {
          return;
        }
        setError(e?.message ?? 'Error');
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void load();
    return () => controller.abort();
  }, [query.view, query.q,query.onlyNew]);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 3 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>Products</Typography>

        <Controls
          q={q}
          setQ={setQ}
          view={view}
          setView={setView}
          onlyNew={onlyNew}
          setOnlyNew={setOnlyNew}
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

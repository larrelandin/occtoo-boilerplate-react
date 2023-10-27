import { FilterProvider } from './providers/FilterProvider';
import { Products, Product, Category } from '@/views';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/**
 * * Create query client
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

/**
 * * Create router
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <Products />,
  },
  {
    path: '/:categoryName',
    element: <Category />,
  },
  {
    path: '/:categoryName/:productId',
    element: <Product />,
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <FilterProvider>
        <RouterProvider router={router} />
      </FilterProvider>
    </QueryClientProvider>
  );
}

export default App;

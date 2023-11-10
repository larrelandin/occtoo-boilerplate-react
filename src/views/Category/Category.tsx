import { useEffect, useState } from 'react';
import { DefaultService as OcctooDestinationClient, limitedproductdataApiResponse } from '@/generated';
import { useQuery } from '@tanstack/react-query';
import { useFilter } from '@/providers/FilterProvider';
import { AiOutlineLoading } from 'react-icons/ai';

/**
 * Pagination size
 */
const PAGE_SIZE = 16;
//const CATEGORY = 'T-shirt'; // make this dynamic

const Category = () => {
  /**
   * Get filters from context
   */
  const { filters, staticFacets, setStaticFacets, setFacets } = useFilter();

  /**
   * Pagination
   */
  const [page, setPage] = useState(0);

  /**
   * Products
   */
  const [products, setProducts] = useState<limitedproductdataApiResponse['results']>([]);

  /**
   * Fetch products
   */
  const { data, isLoading, isError, isRefetching } = useQuery<limitedproductdataApiResponse>(
    ['products', page, filters],
    () =>
      OcctooDestinationClient.limitedproductdata({
        top: PAGE_SIZE,
        skip: page * PAGE_SIZE,
        includeTotals: true,
        
        filter: [
          {
            must: filters,
          },
        ],
      }),
    {
      keepPreviousData: true,
      onSuccess(data) {
        setFacets && data.facets && setFacets(data.facets);
        !staticFacets && setStaticFacets && data.facets && setStaticFacets(data.facets);
        setProducts((products) =>
          page === 0 ? data.results : products && data.results ? [...products, ...data.results] : data.results,
        );
      },
    },
  );

  /**
   * Reset page on filter change
   */
  useEffect(() => {
    setPage(0);
  }, [filters]);

  /**
   * Paginate query
   */
  const fetchMore = () => {
    setPage((page) => page + 1);
  };

  /**
   * Handle error
   */
  if (isError) return <div>Error!</div>;

  /**
   * Render
   */
  return (
    <div className="md:flex items-start">
      {data && products && (
        <div className={`w-full pb-10 ${isLoading || isRefetching ? 'opacity-50' : ''}`}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gridGap: 25,
            }}
            className="p-4 md:p-6"
          >
            {/* {products?.map((p, index) => (
              <ProductCard
                key={index}
                data={{
                  id: p.id || '',
                  title: p.name || '',
                  subTitle: p.id || '',
                  imageSrc: p.thumbnail || '',
                  category: p.category || 'product',
                }}
              />
            ))} */}
          </div>
          {(data.total || 0) > (products.length || 0) && (
            <div className="px-6">
              <div
                className="shadow-lg flex items-center justify-center border rounded-md p-2 bg-black text-white hover:bg-black/80 cursor-pointer mt-6 mb-3 mx-auto w-full md:max-w-[200px] font-medium text-sm"
                onClick={() => fetchMore()}
              >
                {(isLoading || isRefetching) && <AiOutlineLoading className="mr-2 h-3 w-3 animate-spin" />}
                Load more
              </div>
              <div className="text-center text-sm text-gray-500">
                Showing {products.length} of {data.total || 0} products
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Category;

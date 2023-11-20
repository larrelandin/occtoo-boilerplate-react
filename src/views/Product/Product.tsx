import { useState } from 'react';
import { DefaultService as OcctooDestinationClient, fullproductdataApiResponse } from '@/generated';
import { useQuery } from '@tanstack/react-query';
import { useFilter } from '@/providers/FilterProvider';
import {useOutletContext, useParams} from 'react-router-dom';
import Accordion from './components/Accordion/Accordion';
import Rater from './components/Rater/Rater';
import ImageGallery from 'react-image-gallery';

type Increment<A extends number[]> = [...A, 0];
 
type DeepRequired<
  T,
  D extends number = -1,
  R extends number[] = [],
> = T extends object
  ? R["length"] extends D
    ? T
    : {
        [K in keyof T]-?: DeepRequired<T[K], D, Increment<R>>;
      }
  : T;
 
type Product = DeepRequired<fullproductdataApiResponse, 2>["results"][number];

const Product = () => { 

  const isOcctooSourcesVisible = useOutletContext();

  const {productId} = useParams();

  const { filters } = useFilter();

  //const [page, setPage] = useState(0);

  const [product, setProduct] = useState<Product|null>();

  const { data, isLoading, isError, isRefetching } = useQuery<fullproductdataApiResponse>(
    ['products', filters],
    () =>
      OcctooDestinationClient.fullproductdata({
        includeTotals: false,
        filter: [
          {
            must: {...filters, id:[productId!]},
          },
        ],
      }),
    {
      keepPreviousData: true,
      onSuccess(data) {
        data.results?.length && setProduct(data.results[0]);
      },
    },
  );

  if (isError) return <div>Error!</div>;

  return (
    <div className="md:flex items-start">
      <div className="w-full flex-shrink-0 p-4 md:p-6 md:sticky top-0">
        {data && product && (
        <div className={`w-full pb-10 ${isLoading || isRefetching ? 'opacity-50' : ''}`}>
          <section className="text-gray-700 body-font overflow-hidden bg-white">
            <div className="container px-2 py-2 mx-auto">
              <div className="lg:w-4/5 mx-auto flex flex-wrap">
                <div className={`lg:w-1/2 w-full object-cover object-center rounded border border-gray-200 ${isOcctooSourcesVisible ? 'border-2 border-teal-500' : ''}`}>
                  <ImageGallery
                    showBullets={false}
                    showFullscreenButton={false}
                    showPlayButton={false}
                    items={product.media!.slice(1).filter(item => item.url && item.url.trim() !== '').map(item => ({
                      original: item.url || '',
                      thumbnail: item.url + '?impolicy=small'
                    }))}
                  />
                  </div>
                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                  <h2 className="text-sm title-font text-gray-500 tracking-widest">
                    <span className={` ${isOcctooSourcesVisible ? 'border-2 border-teal-500 mt-1' : ''}`}>{product.collection}</span>
                    <span> | </span>
                    <span className={` ${isOcctooSourcesVisible ? 'border-2 border-yellow-500 mt-1' : ''}`}>{product.productId}</span>
                  </h2>
                  <h1 className={`text-gray-900 text-3xl title-font font-medium mb-1  ${isOcctooSourcesVisible ? 'border-2 border-teal-500 mt-1' : ''}`}>{product.title}</h1>
                    <div className={`${isOcctooSourcesVisible ? 'border-2 border-rose-500 mt-1' : ''}`}>
                    <Rater
                      averageRating = {product.averageReview}
                      totalRatings={product.totalReviews}
                    />
                    </div>
                  <p className={`leading-relaxed ${isOcctooSourcesVisible ? 'border-2 border-teal-500 mt-1' : ''}`}>{product.description}</p>
                  <div className="mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                  {product.pricing && product.pricing[0] && product.pricing[0].price !== null && (
                    <span className={` ${isOcctooSourcesVisible ? 'border-2 border-yellow-500 mt-1' : ''}`}>
                      <span>Pricing: </span>
                      <span className="title-font font-medium text-l text-gray-900">{product.pricing[0].price?.toLocaleString('se') + ' ' + product.pricing[0].currency}</span>
                    </span>
                  )}
                  {product.stockLevel && product.stockLevel > 0 ? (
                    <span className={`ml-10 ${isOcctooSourcesVisible ? 'border-2 border-blue-500 mt-1' : ''}`}>
                      <span>Availability: </span>
                      <span className="title-font font-medium text-l text-gray-900">{product.stockLevel} items in stock</span>
                    </span>
                  ) : (
                    <span className="title-font font-medium text-l text-gray-900 ml-10">Product out of stock</span>
                  )}
                  </div>
                  <Accordion className={`mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5 ${isOcctooSourcesVisible ? 'border-2 border-teal-500 mt-1' : ''}`} id='wash' title= "Washing Instructions" text= {product.wash} />
                  <Accordion className={`mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5 ${isOcctooSourcesVisible ? 'border-2 border-teal-500 mt-1' : ''}`} id='material' title= "Product Material" text= {product.material} />
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
      </div>
    </div>
  );
};

export default Product;

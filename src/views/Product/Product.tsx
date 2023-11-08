import { useState } from 'react';
import { DefaultService as OcctooDestinationClient, fullproductdataApiResponse } from '@/generated';
import { useQuery } from '@tanstack/react-query';
import { useFilter } from '@/providers/FilterProvider';
import {useParams, Link} from 'react-router-dom';
import Accordion from '../components/Accordion';
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
        <Link className="flex items-center font-medium mb-6" to="/" >
          <img src="/occtoo.webp" className="mr-2 w-5 h-5" />
          <div>Occtoo Demo</div>
        </Link>
        {data && product && (
        <div className={`w-full pb-10 ${isLoading || isRefetching ? 'opacity-50' : ''}`}>
          <section className="text-gray-700 body-font overflow-hidden bg-white">
            <div className="container px-5 py-24 mx-auto">
              <div className="lg:w-4/5 mx-auto flex flex-wrap">
                <div className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200">
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
                  <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.collection}</h2>
                  <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title}</h1>
                  <div className="flex mb-4">
                    <span className="flex items-center">
                      <span className="text-gray-600 mr-2">{product.averageReview}</span>
                      <div className="text-xl">
                        {/* <Rater
                          total={5}
                          interactive={false}
                          rating={product.averageReview}
                        /> */}
                      </div>
                      <span className="text-gray-600 ml-3">{product.totalReviews} Reviews</span>
                    </span>
                  </div>
                  <p className="leading-relaxed">{product.description}</p>
                  <Accordion id='wash' title= "Washing Instructions" text= {product.wash} />
                  <Accordion id='material' title= "Product Material" text= {product.material} />
                  <Accordion id='weight' title= "Weight" text= {product.weight} />
                  <div className="flex">
                    <span className="title-font font-medium text-2xl text-gray-900">{product.pricing && product.pricing[0] && product.pricing[0].price !== null ? product.pricing[0].price + ' ' + product.pricing[0].currency : ''}</span>
                    <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">Commerce!</button>
                  </div>
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

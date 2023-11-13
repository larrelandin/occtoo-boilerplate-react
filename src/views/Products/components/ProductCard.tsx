import React from 'react';
import { useOutletContext, Link } from "react-router-dom";

interface IProductCard {
  data: {
    id: string;
    title: string;
    subTitle: string;
    imageSrc: string;
    category: string;
  };
}

const ProductCard: React.FC<IProductCard> = ({ data }) => {

  const isOcctooSourcesVisible = useOutletContext();
  
  return (
    <div className="mx-auto max-w-[250px] flex flex-col items-center justify-start bg-white overflow-hidden hover:opacity-90 transition-opacity">
      <Link to={{ pathname: `/${data.category}/${data.id}` }} >
        <div className={`max-h-[300px] w-full flex items-center justify-center mb-2 ${isOcctooSourcesVisible ? 'border-2 border-green-500 mt-1' : ''}`}>
          <img className="max-w-full max-h-full" src={data.imageSrc} />
        </div>

        <div className="w-full px-2">
          <div className={`font-bold ${isOcctooSourcesVisible ? 'border-2 border-green-500 mt-1' : ''}`}>{data.title}</div>
          <div className={`text-sm text-gray-500 ${isOcctooSourcesVisible ? 'border-2 border-yellow-500 mt-1' : ''}`}>{data.subTitle}</div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

import React from 'react';
import { Link } from "react-router-dom";

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
  return (
    <div className="mx-auto max-w-[250px] flex flex-col items-center justify-start bg-white overflow-hidden hover:opacity-90 transition-opacity">
      <Link to={{ pathname: `/${data.category}/${data.id}` }} >
        <div className="max-h-[300px] w-full flex items-center justify-center mb-2">
          <img className="max-w-full max-h-full" src={data.imageSrc} />
        </div>

        <div className="w-full px-2">
          <div className="font-bold">{data.title}</div>
          <div className="text-sm text-gray-500">{data.subTitle}</div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

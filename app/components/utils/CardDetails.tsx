import React from "react";

import { Product } from "@/app/utils/types/app";

const CardDetails = ({ product }: { product: Product }) => {
  return (
    <div className="card-details">
      <div className="container">
        <h2>{product.productName}</h2>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
      </div>
    </div>
  );
};

export default CardDetails;

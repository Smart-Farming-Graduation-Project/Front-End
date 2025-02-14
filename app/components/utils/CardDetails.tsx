import React from "react";

import { Product } from "@/app/utils/types/app";

const CardDetails = () => {
  // fetch product here
  const product: Product = {
    id: 1,
    name: "Organic Apples",
    description: "Fresh organic apples from our farm.",
    price: 5.99,
  };

  return (
    <div className="card-details">
      <div className="container">

      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      </div>
    </div>
  );
};

export default CardDetails;

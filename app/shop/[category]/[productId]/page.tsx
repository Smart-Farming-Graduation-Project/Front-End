import Crumb from "@/app/components/banner/Crumb";
import React from "react";
import shop_crumb from "@/app/assets/images/shop_crumb.jpg";
import CardDetails from "@/app/shop/[category]/[productId]/CardDetails";
import { getProductById } from "../../../utils/api/Products";
import { ProductId } from "@/app/utils/types/app";
import { Toaster } from "react-hot-toast";
const Product_details = async ({ params }: { params: { productId: string } }) => {
  const product: ProductId = await getProductById(Number(params.productId));
  if (!product) return <p>Product not found</p>;
  return (
    <main>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <Crumb crumb={shop_crumb} productName={product.productName} categoryName={product.categoryName} />
      <CardDetails product={product} />
    </main>
  );
};

export default Product_details;

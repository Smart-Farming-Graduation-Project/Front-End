import Crumb from "@/app/components/banner/Crumb";
import React from "react";
import shop_crumb from "@/app/assets/images/shop_crumb.jpg";
import CardDetails from "@/app/shop/[category]/[productId]/CardDetails";
import { getProductById } from "../../../utils/api/Products";
import { getTokenServer } from "@/app/utils/api/getTokenServer";
import { ProductId } from "@/app/utils/types/app";
const Product_details = async ({ params }: { params: { productId: string } }) => {
  const token = await getTokenServer();
  if (!token) return <p>Unauthorized access</p>;
  const product: ProductId = await getProductById(Number(params.productId), token);
  if (!product) return <p>Product not found</p>;
  return (
    <main>
      <Crumb crumb={shop_crumb} productName={product.productName} categoryName={product.categoryName} />
      <CardDetails product={product} />
    </main>
  );
};

export default Product_details;

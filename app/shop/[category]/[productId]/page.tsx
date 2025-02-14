import Crumb from "@/app/components/banner/Crumb";
import React from "react";
import shop_crumb from "@/app/assets/images/shop_crumb.jpg";
import CardDetails from "@/app/components/utils/CardDetails";
const Product_details = () => {
  return (
    <main>
      <Crumb crumb={shop_crumb} />
      <CardDetails />
    </main>
  );
};

export default Product_details;

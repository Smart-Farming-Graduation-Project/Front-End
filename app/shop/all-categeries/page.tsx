import React from "react";
import shop_crumb from "@/app/assets/images/shop_crumb.jpg";
import Crumb from "@/app/components/banner/Crumb";

const AllCategeries = () => {
  return (
    <main>
      <Crumb crumb={shop_crumb} />
    </main>
  );
};

export default AllCategeries;

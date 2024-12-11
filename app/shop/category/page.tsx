import shop_crumb from "@/app/assets/images/shop_crumb.jpg";
import Crumb from "@/app/components/banner/Crumb";
import React from "react";

const Category = () => {
  return (
    <main>
      <Crumb crumb={shop_crumb} />{" "}
    </main>
  );
};

export default Category;

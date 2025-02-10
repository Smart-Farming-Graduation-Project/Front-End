import React from "react";
import Discover from "../components/shop/Discover";
import FAQ from "../components/shop/FAQ";
import ShopByCategory from "../components/shop/ShopByCategory";
import LatestProducts from "../components/shop/LatestProducts";
import { Toaster } from "react-hot-toast";

const Shop = () => {
  return (
    <main>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <Discover />
      <ShopByCategory />
      <LatestProducts />
      <FAQ />
    </main>
  );
};

export default Shop;

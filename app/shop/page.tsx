import React from "react";
import Discover from "../components/shop/Discover";
import FAQ from "../components/shop/FAQ";
import ShopByCategory from "../components/shop/ShopByCategory";
import LatestProducts from "../components/shop/LatestProducts";
import { Toaster } from "react-hot-toast";
import { getCategories } from "../utils/api/Categories";
import { getMostSells } from "../utils/api/Products";
import { getTokenServer } from "../utils/api/getTokenServer";

export default async function Shop() {
  const token = getTokenServer();
  const categories = await getCategories(token as string);
  const mostSells = await getMostSells(token as string);
  return (
    <main>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <Discover />
      <ShopByCategory categories={categories} />
      <LatestProducts mostSells={mostSells} />
      <FAQ />
    </main>
  );
}

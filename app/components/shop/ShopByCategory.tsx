"use client";
import Image from "next/image";
import category_img from "../../assets/images/apples.png";
import Heading from "../utils/Heading";
import Link from "next/link";
const ShopByCategory = () => {
  return (
    <div className="shop-by-category p-sec">
      <div className="container">
        <Heading heading="Shop By Category" paragraph=" Discover the best products, straight from the farm to your home." />
        <div className="category-container">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* array when click on category item send to category page */}
            {["Fruits", "Vegetables", "Dairy", "Meat", "Bakery", "Bakery", "Bakery"].map((category) => (
              <Link href={`/shop/${category.toLowerCase()}`} key={category} className="category-item text-center">
                <div className="relative cursor-pointer ">
                  <Image src={category_img} alt={category} className="w-full h-32 object-cover mb-2 rounded-2xl hover:shadow-md hover:scale-105 transition-all duration-300 ease-in-out" />
                  <h3 className="text-lg font-bold">{category}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopByCategory;

import Image from "next/image";
import category_img from "../../assets/images/apples.png";
import Heading from "../utils/Heading";
import Link from "next/link";
import { CategoryType } from "@/app/utils/types/app";

interface ShopByCategoryProps {
  categories: CategoryType[] | null;
}

const ShopByCategory: React.FC<ShopByCategoryProps> = ({ categories }) => {
  if (!categories || categories.length === 0) {
    return (
      <div className="shop-by-category p-sec text-center">
        <p className="text-gray-600">Loading categories...</p>
      </div>
    );
  }
  return (
    <div className="shop-by-category p-sec" id="categoryId">
      <div className="container">
        <div>
          <Heading heading="Shop By Category" paragraph=" Discover the best products, straight from the farm to your home." />
        </div>

        <div className="category-container">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category, index) => (
              <div key={category.categoryId} >
                <Link href={`/shop/${category.categoryId}`} className="category-item text-center">
                  <div className="relative cursor-pointer">
                    <Image
                      src={category.categoryImage ? category.categoryImage : category_img}
                      alt={category.categoryName}
                      width={300}
                      height={128}
                      className="w-full h-32 object-cover mb-2 rounded-2xl hover:shadow-md hover:scale-105 transition-all duration-300 ease-in-out"
                    />
                    <h3 className="text-lg font-bold">{category.categoryName}</h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopByCategory;

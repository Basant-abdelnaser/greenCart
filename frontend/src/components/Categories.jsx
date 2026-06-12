import { Link } from "react-router-dom";
import { categories } from "../assets/greencart_assets/assets";

const Categories = () => {
  
  return (
    <div className="mt-14 ">
      <h1 className="text-2xl font-bold text-primary mb-4">Categories</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <div
            key={category.text}
            className={`cursor-pointer flex flex-col items-center justify-center gap-2 p-4 rounded-md group hover:translate-y-2 hover:shadow-lg transition`}
            style={{ backgroundColor: category.bgColor }}
          >
            <Link
              to={`/products/${category.text.toLowerCase()}`}
              onClick={() => scrollTo(0, 0)}
            >
              <img
                src={category.image}
                alt={category.text}
                className="w-25  group-hover:scale-115 transition"
              />
              <p>{category.text}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;

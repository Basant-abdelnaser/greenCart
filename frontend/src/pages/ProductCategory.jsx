import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProductCategory = () => {
  const { category } = useParams();
  const { axios } = useAppContext();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("/api/products/list")
      .then((res) => {
        const filtered = res.data.products.filter((product) => {
          return (
            product.inStock &&
            product.category.toLowerCase() === category.toLowerCase()
          );
        });
        setProducts(filtered);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response?.data?.message);
      });
  }, [category]);

  return (
    <div className="mt-16 flex flex-col px-4 lg:px-0">
      <div className=" flex flex-col items-end w-max">
        <p className="text-2xl  uppercase">{category}</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>
      {products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {products
            .filter((product) => {
              return (
                product.inStock && product.category.toLowerCase() === category
              );
            })
            .map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
      )}
      {products.length === 0 && (
        <div className="flex items-center justify-center h-96">
          <p className="text-2xl font-bold text-primary">No products found</p>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;

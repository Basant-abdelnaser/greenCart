import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "./ProductCard";
import toast from "react-hot-toast";

const BestSeller = () => {
  const [products, setProducts] = useState([]);
  const { axios } = useAppContext();
  useEffect(() => {
    axios
      .get("/api/products/list")
      .then((res) => setProducts(res.data.products))
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  }, [products]);
  return (
    <div className="mt-14  px-3  ">
      <h1 className="text-2xl font-bold text-primary mb-4">Best Sellers</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {products &&
          products
            .filter((product) => product.inStock)
            .slice(0, 5)
            .map((product) => (
              <div key={product._id}>
                <ProductCard key={product._id} product={product} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default BestSeller;

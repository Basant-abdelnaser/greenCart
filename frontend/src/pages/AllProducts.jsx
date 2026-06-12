import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import toast from "react-hot-toast";

const AllProducts = () => {
  const { searchQuery, axios } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allPrroducts, setAllProducts] = useState([]);
  useEffect(() => {
    axios
      .get("/api/products/list")
      .then((res) => {
        setAllProducts(res.data.products);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message);
      });
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredProducts(
        allPrroducts.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      );
    } else {
      setFilteredProducts(allPrroducts);
    }
  }, [searchQuery, allPrroducts]);
  return (
    <div className="mt-16 flex flex-col px-4 lg:px-0">
      <div className=" flex flex-col items-end w-max">
        <p className="text-2xl  uppercase">All Products</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>
      {filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {filteredProducts
            .filter((product) => {
              return product.inStock;
            })
            .map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
      )}
      {filteredProducts.length === 0 && (
        <div className="flex items-center justify-center mt-4">
          <p className="text-2xl font-bold text-primary">No Products Found</p>
        </div>
      )}
    </div>
  );
};

export default AllProducts;

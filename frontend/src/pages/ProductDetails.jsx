import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/greencart_assets/assets";
import ProductCard from "../components/ProductCard";
const ProductDetails = () => {
  const { id } = useParams();

  const { addToCart, navigate, axios } = useAppContext();

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);

  const [thumbnail, setThumbnail] = React.useState("");
  const [relatedProducts, setRelatedProducts] = React.useState([]);

  useEffect(() => {
    axios.get(`/api/products/${id}`).then((res) => {
      setProduct(res.data.product);
    });

    axios.get("/api/products/list").then((res) => {
      setProducts(res.data.products);
    });
  }, []);

  useEffect(() => {
    if (product) {
      setThumbnail(product.image[0]);
      setRelatedProducts(
        products
          .filter(
            (item) =>
              item.category === product.category && item._id !== product._id,
          )
          .slice(0, 4),
      );
    }
  }, [product, products]);

  return (
    product && (
      <div className="max-w-6xl w-full px-6">
        <p>
          <Link to="/">Home</Link> /<Link to="/products"> Products</Link> /
          <Link to={`/products/${product.category.toLowerCase()}`}>
            {" "}
            {product.category}
          </Link>{" "}
          /
          <Link
            to={`/product/${product.category.toLowerCase()}/${product._id}`}
            className="text-primary"
          >
            {" "}
            {product.name}
          </Link>
        </p>

        <div className="flex flex-col md:flex-row gap-16 mt-4">
          <div className="flex gap-3">
            <div className="flex flex-col gap-3">
              {product.image.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>

            <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
              <img
                src={thumbnail}
                alt="Selected product"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="text-sm w-full md:w-1/2">
            <h1 className="text-3xl font-medium">{product.name}</h1>

            <div className="flex items-center gap-0.5">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <img
                    className="md:w-3.5  w-3"
                    src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                    key={i}
                    alt=""
                  />
                ))}
              <p>({4})</p>
            </div>

            <div className="mt-6">
              <p className="text-gray-500/70 line-through">
                MRP: ${product.price}
              </p>
              <p className="text-2xl font-medium">MRP: ${product.offerPrice}</p>
              <span className="text-gray-500/70">(inclusive of all taxes)</span>
            </div>

            <p className="text-base font-medium mt-6">About Product</p>
            <ul className="list-disc ml-4 text-gray-500/70">
              {product.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>

            <div className="flex items-center mt-10 gap-4 text-base">
              <button
                className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
                onClick={() => addToCart(product._id)}
              >
                Add to Cart
              </button>
              <button
                className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-primary-dull transition"
                onClick={() => {
                  addToCart(product._id);
                  navigate("/cart");
                  scrollTo(0, 0);
                }}
              >
                Buy now
              </button>
            </div>
          </div>
        </div>

        <div className="mt-30">
          <h2 className="text-3xl font-medium text-primary text-center mb-2">
            Related Products
          </h2>
          <div className="w-16 h-0.5 bg-primary rounded-full mx-auto mb-8"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 justify-items-center  mx-auto">
            {relatedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <button
            className="text-primary text-lg border-2 border-primary px-3 py-2 block mx-auto rounded-md mt-8 hover:bg-primary-dull hover:text-white transition cursor-pointer"
            onClick={() => navigate("/products")}
          >
            See More
          </button>
        </div>
      </div>
    )
  );
};

export default ProductDetails;

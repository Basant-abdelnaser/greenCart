import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext";
import { dummyProducts } from "../assets/greencart_assets/assets";
import { toast } from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState({});

  const addToCart = (productId) => {
    if (!user) {
      toast.error("Please login to add products to cart");
      return;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[productId]) {
      cartData[productId] += 1;
    } else {
      cartData[productId] = 1;
    }
    console.log(cartData);
    axios
      .put("/api/cart/update", { cartItems: cartData })
      .then(() => {
        setCartItems(cartData);
        toast.success("Product added to cart");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const removeFromCart = (itemId) => {
    if (!user) {
      toast.error("Please login to add products to cart");
      return;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }
    console.log(cartData);

    axios
      .put("/api/cart/update", { cartItems: cartData })
      .then(() => {
        setCartItems(cartData);
        toast.success("Product removed from cart");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const updateCartItem = (itemId, quantity) => {
    if (!user) {
      toast.error("Please login to add products to cart");
      return;
    }
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    console.log(cartData);
    axios
      .put("/api/cart/update", { cartItems: cartData })
      .then(() => {
        setCartItems(cartData);
        toast.success("Product quantity updated in cart");
      })
      .catch((err) => {
        setCartItems(cartData);
        toast.error(err.response.data.message);
      });
  };

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    addToCart,
    updateCartItem,
    removeFromCart,
    cartItems,
    searchQuery,
    setSearchQuery,
    axios,
    setCartItems,
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setProducts(dummyProducts);
    };
    const fetchSellerState = async () => {
      try {
        axios
          .get("api/seller/is-auth")
          .then(() => {
            setIsSeller(true);
          })
          .catch(() => {
            setIsSeller(false);
          });
      } catch (err) {
        setIsSeller(false);
        console.log(err);
      }
    };
    const fetchUser = async () => {
      try {
        axios
          .get("api/user/is-auth")
          .then((res) => {
            setUser(res.data.user);
            setCartItems(res.data.user.cartItems);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
    fetchSellerState();
    fetchProducts();
  }, []);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;

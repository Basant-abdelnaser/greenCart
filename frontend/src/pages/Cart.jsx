import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/greencart_assets/assets";
import Select from "react-select";
import toast from "react-hot-toast";
const Cart = () => {
  const [showAddress, setShowAddress] = React.useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [addresses, setAddresses] = useState([]);
  const [products, setProducts] = useState([]);
  const {
    cartItems,
    navigate,
    updateCartItem,
    removeFromCart,
    axios,
    setCartItems,
  } = useAppContext();

  const cartProducts = Object.entries(cartItems)
    .map(([productId, quantity]) => {
      const product = products.find((product) => product._id === productId);

      if (!product) return null;

      return {
        ...product,
        quantity,
      };
    })
    .filter(Boolean);
  const options = [
    { value: "COD", label: "Cash On Delivery" },
    { value: "Online", label: "Online Payment" },
  ];
  const getTax =
    cartProducts.reduce(
      (acc, item) => acc + item.offerPrice * item.quantity,
      0,
    ) * 0.02;

  const getTotal =
    cartProducts.reduce(
      (acc, item) => acc + item.offerPrice * item.quantity,
      0,
    ) + getTax;

  const placeOrder = () => {
    console.log("cartProducts", {
      items: cartProducts,
      address: selectedAddress._id,
      amount: getTotal,
    });
    axios
      .post("/api/orders/cod", {
        items: cartProducts.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        address: selectedAddress._id,
        amount: getTotal,
      })
      .then((res) => {
        toast.success(res.data.message);
        setCartItems({});
        navigate("/my-orders");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    axios
      .get("/api/products/list")
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });

    axios
      .get("/api/address/get")
      .then((res) => {
        setSelectedAddress(res.data.addresses[res.data.addresses.length - 1]);
        setAddresses(res.data.addresses);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  }, [cartItems]);

  return (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-primary">
            {Object.keys(cartItems).length} items
          </span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartProducts.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden"
                onClick={() => {
                  navigate(
                    `/products/${product.category.toLowerCase()}/${product._id}`,
                  );
                  scrollTo(0, 0);
                }}
              >
                <img
                  className="max-w-full h-full object-cover"
                  src={product.image[0]}
                  alt={product.name}
                />
              </div>
              <div>
                <p className="hidden md:block font-semibold">{product.name}</p>
                <div className="font-normal text-gray-500/70">
                  <p>
                    Weight: <span>{product.weight || "N/A"}</span>
                  </p>
                  <div className="flex items-center">
                    <p>Qty:</p>
                    <select
                      className="outline-none"
                      value={product.quantity}
                      onChange={(e) => {
                        updateCartItem(product._id, e.target.value);
                      }}
                    >
                      {Array(
                        cartItems[product._id] > 9 ? cartItems[product._id] : 9,
                      )
                        .fill("")
                        .map((_, index) => (
                          <option key={index} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center">
              ${product.offerPrice * product.quantity}
            </p>
            <button
              className="cursor-pointer mx-auto"
              onClick={() => {
                removeFromCart(product._id);
              }}
            >
              <img src={assets.remove_icon} alt="remove icon" />
            </button>
          </div>
        ))}

        <button
          className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium group "
          onClick={() => navigate("/products")}
        >
          <img
            src={assets.arrow_right_icon_colored}
            alt=""
            className="group-hover:translate-x-1 transition"
          />
          Continue Shopping
        </button>
      </div>

      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex justify-between items-start mt-2">
            <p className="text-gray-500">
              {selectedAddress
                ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state},${selectedAddress.country}`
                : "No Address Found"}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-primary hover:underline cursor-pointer"
            >
              Change
            </button>
            {showAddress && (
              <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full z-50">
                {addresses.map((address) => (
                  <p
                    onClick={() => {
                      setSelectedAddress(address);
                      setShowAddress(false);
                    }}
                    className="text-gray-500 p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {`${address.street}, ${address.city}, ${address.state}, ${address.country}`}
                  </p>
                ))}
                <p
                  onClick={() => {
                    navigate("/add-address");
                  }}
                  className="text-primary text-center cursor-pointer p-2 hover:bg-primary hover:text-white"
                >
                  Add address
                </p>
              </div>
            )}
          </div>

          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

          <Select
            options={options}
            value={options.find((option) => option.value === paymentMethod)}
            onChange={(selectedOption) =>
              setPaymentMethod(selectedOption.value)
            }
            className="mt-2"
            styles={{
              control: (base) => ({
                ...base,
                border: "1px solid #d1d5db",
                boxShadow: "none",
                borderRadius: 0,
                padding: "2px",
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? "#4fbf8b" : "#fff",
                color: state.isFocused ? "#fff" : "#4fbf8b",
              }),
            }}
          />
        </div>

        <hr className="border-gray-300" />

        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>
              {cartProducts.reduce(
                (acc, item) => acc + item.offerPrice * item.quantity,
                0,
              )}
            </span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>{getTax.toFixed(2)}</span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>{getTotal.toFixed(2)}</span>
          </p>
        </div>

        <button
          onClick={placeOrder}
          className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition"
        >
          {paymentMethod === "COD" ? "Place Order" : "Proceed to checkout"}
        </button>
      </div>
    </div>
  );
};

export default Cart;

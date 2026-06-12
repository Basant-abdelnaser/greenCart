import { useEffect, useState } from "react";
import { assets } from "../assets/greencart_assets/assets";
import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
const Navbar = ({ setLoginClick }) => {
  const [open, setOpen] = useState(false);

  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    setSearchQuery,
    searchQuery,
    cartItems,
    axios,
  } = useAppContext();

  const logout = () => {
    axios
      .get("/api/user/logout")
      .then(() => {
        setUser(null);
        navigate("/");
        setOpen(false);
        toast.success("Logout successful");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    if (searchQuery > 0) {
      navigate("/products");
    }
  });
  console.log(cartItems);
  return (
    <nav className="grid grid-cols-[auto_1fr_auto] items-center px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      {/* Logo */}
      <div>
        <NavLink to="/" onClick={() => setOpen(false)}>
          <img src={assets.logo} alt="GreenCart Logo" />
        </NavLink>
      </div>

      {/* Desktop Menu - Center */}
      <div className="hidden sm:flex items-center justify-center gap-8">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">All Products</NavLink>
        <NavLink to="/">Contact</NavLink>
      </div>

      {/* Right Side */}
      <div className="hidden sm:flex items-center justify-end gap-8">
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <img src={assets.search_icon} alt="Search" />
        </div>

        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <img src={assets.cart_icon} alt="Cart" className="w-6 h-6" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-4.5 h-4.5 rounded-full">
            {Object.keys(cartItems).length}
          </button>
        </div>

        {!user ? (
          <button
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
            onClick={() => {
              setLoginClick(true);
            }}
          >
            Login
          </button>
        ) : (
          <div className="relative cursor-pointer group">
            <img
              src={assets.profile_icon}
              alt="Avatar"
              className="w-8 h-8 rounded-full"
            />
            <div className="absolute top-8 right-0 bg-white shadow-md py-4 hidden flex-col items-start gap-2 text-sm w-30 group-hover:flex z-50">
              <NavLink
                to="/my-orders"
                className="cursor-pointer hover:bg-gray-100 transition w-full py-2 px-2 text-left"
              >
                My Orders
              </NavLink>

              <button
                className="cursor-pointer hover:bg-gray-100 transition w-full py-2 px-2 text-left"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Right Side */}
      <div className="sm:hidden flex items-center gap-4 ml-auto">
        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <img src={assets.cart_icon} alt="Cart" className="w-6 h-6" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-4.5 h-4.5 rounded-full">
            {Object.keys(cartItems).length}
          </button>
        </div>

        <button onClick={() => setOpen(!open)} aria-label="Menu">
          <img src={assets.menu_icon} alt="" />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-15 left-0 w-full bg-white shadow-md py-4 flex flex-col items-start gap-2 px-5 text-sm md:hidden z-50">
          <NavLink to="/" onClick={() => setOpen(false)}>
            Home
          </NavLink>

          <NavLink to="/products" onClick={() => setOpen(false)}>
            All Products
          </NavLink>

          {user && (
            <NavLink to="/my-orders" onClick={() => setOpen(false)}>
              My Orders
            </NavLink>
          )}

          <NavLink to="/" onClick={() => setOpen(false)}>
            Contact
          </NavLink>

          {!user ? (
            <button
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
              onClick={() => {
                setShowUserLogin(true);
                setOpen(false);
              }}
            >
              Login
            </button>
          ) : (
            <button
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
              onClick={logout}
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

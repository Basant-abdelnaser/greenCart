import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate, axios } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isSeller) navigate("/seller");
  }, [isSeller]);

  const handleSellerLogin = (e) => {
    try {
      e.preventDefault();
      const data = { email, password };
      axios
        .post("/api/seller/login", data)
        .then(() => {
          setIsSeller(true);
          toast.success("Login successful");
          navigate("/seller");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    !isSeller && (
      <div className="bg-white min-h-screen min-w-screen fixed z-50 flex items-center justify-center px-4">
        <form
          onSubmit={handleSellerLogin}
          onClick={(e) => e.stopPropagation()}
          className="w-full sm:w-[360px] bg-white border border-gray-200 rounded-2xl p-8 shadow-2xl text-center relative
                     transform transition-all duration-300 hover:scale-[1.01]"
        >
          {/* Title */}
          <h1 className="text-gray-500 text-3xl mt-6 font-medium">
            <span className="text-primary">Seller</span> Login
          </h1>

          {/* Email */}
          <div
            className="flex items-center w-full mt-6 border border-gray-200 h-12 rounded-full overflow-hidden pl-6 gap-2
                       focus-within:border-primary transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="text-gray-400"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
              <rect x="2" y="4" width="20" height="16" rx="2" />
            </svg>

            <input
              type="email"
              placeholder="Email id"
              className="w-full bg-transparent text-gray-700 placeholder-gray-400 border-none outline-none
                         text-sm tracking-wide"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div
            className="flex items-center mt-4 w-full border border-gray-200 h-12 rounded-full overflow-hidden pl-6 gap-2
                       focus-within:border-primary transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="text-gray-400"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>

            <input
              type="password"
              placeholder="Password"
              className="w-full bg-transparent text-gray-700 placeholder-gray-400 border-none outline-none
                         text-sm tracking-wide"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="mt-3 text-left">
            <button
              type="button"
              className="text-sm text-primary hover:underline transition"
            >
              Forget password?
            </button>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="mt-5 w-full h-11 rounded-full text-white bg-primary
                       hover:bg-primary-dull transition-all duration-200
                       active:scale-[0.98] shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>
      </div>
    )
  );
};

export default SellerLogin;

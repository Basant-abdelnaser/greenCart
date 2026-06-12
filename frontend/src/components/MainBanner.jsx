import { Link } from "react-router-dom";
import { assets } from "../assets/greencart_assets/assets";
const MainBanner = () => {
  return (
    <div className="relative  ">
      <img src={assets.main_banner_bg} alt="" className="hidden md:block" />
      <img
        src={assets.main_banner_bg_sm}
        alt=""
        className="block md:hidden w-full object-cover"
      />
      <div className="absolute top-1/2 transform  -translate-y-1/2 pl-10  w-full md:w-1/2 lg:w-1/2 ">
        <h1 className="text-2xl font-bold leading-10 lg:text-4xl lg:leading-15">
          Freshness You Can Trut, Savings You Will Love!
        </h1>
        <div className="flex gap-6 mt-3 flex-wrap">
          <Link
            to="/products"
            className="bg-primary px-5 py-3  rounded-md text-white  hover:bg-primary-dull transition cursor-pointer flex gap-2 items-center whitespace-nowrap "
          >
            <span>Shop Now</span>
            <img src={assets.white_arrow_icon} alt="" className="w-5" />
          </Link>
          <button className=" hidden md:flex gap-2 items-center cursor-pointer whitespace-nowrap group ">
            <span>Explore Details</span>
            <img
              src={assets.black_arrow_icon}
              alt=""
              className="w-5 group-hover:translate-x-1 transition"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;


import { assets, features } from "../assets/greencart_assets/assets";

const BottomBanner = () => {
  return (
    <div className="mt-20 relative">
      <img
        src={assets.bottom_banner_image}
        alt=""
        className="w-full hidden md:block"
      />
      <img
        src={assets.bottom_banner_image_sm}
        className="block md:hidden"
        alt=""
      />
      <div className="absolute md:top-1/2 transform  md:-translate-y-1/2 pl-10  w-full md:w-1/2 lg:w-1/2 xl:w-1/3 right-0 top-20  sm:-traslate-x-1/2  md:translate-x-0 ">
        <h1 className=" font-bold text-xl lg:text-2xl  text-primary-dull mb-2 lg:mb-5 ">
          Why We Are The Best?
        </h1>
        <div>
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex items-center gap-4 mb-1 lg:mb-4"
            >
              <img src={feature.icon} alt="" className="w-8 lg:w-10 " />
              <div>
                <p className="font-bold lg:text-xl text-base">
                  {feature.title}
                </p>
                <p className="text-gray-500/60 text-xs lg:text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;

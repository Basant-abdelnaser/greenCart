import { useState } from "react";
import { assets } from "../assets/greencart_assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const CustomInput = ({ placeholder, value, onChange, name }) => (
  <input
    type="text"
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="border border-gray-300 rounded-md placeholder:text-gray-300 outline-primary p-2"
    required
  />
);

const initialAddress = {
  firstName: "",
  lastName: "",
  email: "",
  street: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
  phone: "",
};

const AddAddress = () => {
  const [address, setAddress] = useState(initialAddress);
  const { axios, navigate } = useAppContext();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/address/add", address)
      .then((res) => {
        toast.success(res.data.message);
        setAddress(initialAddress);
        navigate("/cart");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="p-4 md:p-0 flex justify-center items-center flex-col md:block  ">
      <h1 className="text-3xl font-medium mb-10 text-gray-500 ">
        Add Shipping <span className="text-primary">Address</span>
      </h1>

      <div className="flex justify-between gap-5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <CustomInput
              placeholder="First Name"
              name="firstName"
              value={address.firstName}
              onChange={handleChange}
            />
            <CustomInput
              placeholder="Last Name"
              name="lastName"
              value={address.lastName}
              onChange={handleChange}
            />
          </div>

          <CustomInput
            placeholder="Email Address"
            name="email"
            value={address.email}
            onChange={handleChange}
          />

          <CustomInput
            placeholder="Street"
            name="street"
            value={address.street}
            onChange={handleChange}
          />

          <div className="grid grid-cols-2 gap-4">
            <CustomInput
              placeholder="City"
              name="city"
              value={address.city}
              onChange={handleChange}
            />

            <CustomInput
              placeholder="State"
              name="state"
              value={address.state}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <CustomInput
              placeholder="ZIP Code"
              name="zipCode"
              value={address.zipCode}
              onChange={(e) => {
                setAddress({ ...address, zipCode: Number(e.target.value) });
              }}
            />

            <CustomInput
              placeholder="Country"
              name="country"
              value={address.country}
              onChange={handleChange}
            />
          </div>

          <CustomInput
            placeholder="Phone"
            name="phone"
            value={address.phone}
            onChange={handleChange}
          />

          <button className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-primary-dull transition rounded-md mt-3">
            Save Address
          </button>
        </form>

        <img
          src={assets.add_address_iamge}
          alt="Address"
          className="hidden md:block"
        />
      </div>
    </div>
  );
};

export default AddAddress;

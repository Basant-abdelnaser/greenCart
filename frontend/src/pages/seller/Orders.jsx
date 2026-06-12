import { useEffect, useState } from "react";
import { assets } from "../../assets/greencart_assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { axios } = useAppContext();
  useEffect(() => {
    axios
      .get("/api/orders")
      .then((res) => {
        setOrders(res.data.orders);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response?.data?.message);
      });
  });
  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll ">
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium">Orders List</h2>
        {orders.map((order) => (
          <div
            key={order._id}
            className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800"
          >
            <div className="flex gap-5">
              <img
                className="w-12 h-12 object-cover opacity-60"
                src={assets.box_icon}
                alt="boxIcon"
              />
              <div>
                {order.items.map((item, index) => (
                  <div key={index} className="flex flex-col justify-center">
                    <p className="font-medium ">
                      {item.product.name}{" "}
                      <span
                        className={`text-primary ${item.quantity < 2 && "hidden"}`}
                      >
                        x {item.quantity}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-sm">
              <p className="font-medium mb-1">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p>
                {order.address.street}, {order.address.city},{" "}
                {order.address.state},{order.address.zipcode},{" "}
                {order.address.country}
              </p>
              <p className="text-primary text-sm">
                Phone: {order.address.phone}
              </p>
            </div>

            <p className="font-medium text-base my-auto text-primary">
              ${order.amount}
            </p>

            <div className="flex flex-col text-sm">
              <p>Method: {order.paymentType}</p>
              <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
              <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

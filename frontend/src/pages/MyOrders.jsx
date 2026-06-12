import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MyOrders = () => {
  // const [orders] = useState(dummyOrders);
  const [orders, setOrders] = useState([]);
  const { axios, user } = useAppContext();

 useEffect(() => {
   if (!user?._id) return;
   axios
     .get(`/api/orders/${user._id}`)
     .then((res) => {
       setOrders(res.data.orders);
     })
     .catch((err) => {
       console.log(err);
       toast.error(err.response?.data?.message);
     });
 }, [user?._id]);

  return (
    <div className="px-4 md:px-10 lg:px-20 py-10">
      {/* Header */}
      <div className="mb-8">
        <p className="text-2xl md:text-3xl uppercase font-semibold text-gray-800">
          My Orders
        </p>
        <div className="w-16 h-0.5 bg-primary rounded-full mt-1"></div>
      </div>

      {/* Orders */}
      {orders.length > 0 && (
        <div className="space-y-10">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 rounded-lg p-4 md:p-6"
            >
              {/* Order Header */}
              <div className="flex flex-col md:flex-row md:justify-between gap-2 md:items-center text-gray-600 text-sm md:text-base font-medium mb-5">
                <p className="break-all">OrderId: {order._id}</p>
                <p>Payment: {order.paymentType}</p>
                <p className="font-semibold text-primary">
                  Total: {order.amount}$
                </p>
              </div>

              {/* Items */}
              <div className="space-y-6">
                {order.items.map((item, index) => (
                  <div key={item._id}>
                    <div className="flex flex-col md:flex-row md:justify-between gap-4 md:items-center">
                      {/* Product Info */}
                      <div className="flex gap-4 items-center">
                        <div className="bg-gray-100 p-2 rounded-md">
                          <img
                            src={item.product.image[0]}
                            alt={item.product.name}
                            className="w-16 h-16 md:w-20 md:h-20 object-cover"
                          />
                        </div>

                        <div>
                          <p className="font-medium text-gray-800">
                            {item.product.name}
                          </p>
                          <p className="text-gray-500 text-sm">
                            Category: {item.product.category}
                          </p>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="text-primary text-sm flex flex-col gap-1 md:text-right">
                        <p>Quantity: {item.quantity}</p>
                        <p>Status: {order.status}</p>
                        <p>Date: {new Date(order.createdAt).toDateString()}</p>
                      </div>

                      {/* Amount */}
                      <div className="md:text-right">
                        <p className="font-semibold text-primary">
                          Amount: {item.product.offerPrice * item.quantity}$
                        </p>
                      </div>
                    </div>

                    {/* Divider */}
                    {index !== order.items.length - 1 && (
                      <hr className="border-gray-200 mt-6" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      {orders.length === 0 && (
        <div className="flex items-center justify-center h-96">
          <p className="text-2xl font-bold text-primary">No orders found</p>
        </div>
      )}
    </div>
  );
};

export default MyOrders;

import Order from "../models/Order.js";

const createOrder = async (data) => {
    const result = await Order.create(data);
    return result;
}

const getOrderById = async (id) => {
    return await Order.findById(id)
}

const getOrderByUserId = async (userId) => {
   const data = await Order.find({ user: userId });
    console.log(data)
}

const updateOrderStatus = async (id, status) => {
    await Order.findByIdAndUpdate(
        id,
        { orderStatus: status },
        { new: true }
    );
}

const updatePaymentStatus = async (id, Status) => {
    await Order.findByIdAndUpdate(
        id,
        { paymentStatus: Status },
        { new: true }
    );
}

const updateKhaltiPaymentStatus = async (pidx, totalAmount, userId) => {
  const order = await order.findOne({ pidx });
  if (!order) {
    throw new Error("No order found");
  }
  if (order.totalAmount !== totalAmount) {
    throw new Error("Some error occured warning!!");
  }
  if(order.user !== userId){throw new Error("Invalid Operations")}

  const result = axios.post('https://dev.khalti.com/api/v2/payment/lookup/', {pidx},{
    headers: {
        'Authorization': `Key ${process.env.KHALTI_SECRET_KEY}`,
        'Content-Type': 'application/json'
    }
  })

  return await order.findOneAndUpdate({pidx},{paymentStatus: "COMPLETED"})
};

export default { createOrder, getOrderById, getOrderByUserId, updateOrderStatus, updatePaymentStatus, updateKhaltiPaymentStatus};
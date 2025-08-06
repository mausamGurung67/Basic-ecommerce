import Order from "../models/Order.js";
import axios from "axios";
import constant from "../cofig/constant.js";

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
  const order = await Order.findOne({ pidx });
  if (!order) {
    throw new Error("No order found");
  }
  console.log(order.totalAmount, totalAmount);
  if (order.totalAmount !== totalAmount) {
    throw new Error("Some error occured warning!!");
  }
//   if(order.user !== userId){throw new Error("Invalid Operations")}

  const result = await axios.post('https://dev.khalti.com/api/v2/epayment/lookup/', {pidx},{
    headers: {
        'Authorization': `Key ${constant.KHALTI_SECRET_KEY}`,
        'Content-Type': 'application/json'
    }
  })
  console.log(result.data);
  
  if(result.data.status !== "Completed"){
    throw new Error("Payment not completed")
  }
  console.log(result.data.totalAmount, order.totalAmount);
  if(result.data.total_amount !== order.totalAmount* 100){
    throw new Error("Payment amount mismatch")
    }
  return await Order.findOneAndUpdate({pidx},{paymentStatus: "COMPLETED"})
};

export default { createOrder, getOrderById, getOrderByUserId, updateOrderStatus, updatePaymentStatus, updateKhaltiPaymentStatus};
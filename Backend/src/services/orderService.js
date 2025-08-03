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

export default { createOrder, getOrderById, getOrderByUserId, updateOrderStatus, updatePaymentStatus };
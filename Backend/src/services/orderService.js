import Order from "../models/Order.js";

const createOrder = async (data) => {
    const result = await Order.create(data);
    return result;
}

const getOrderById = async (id) => {
    return await Order.findById(id)
}

const getOrderByUser = async (userId) => {
    return await Order.find({ userId: userId });
}


export default { createOrder, getOrderById, getOrderByUser };
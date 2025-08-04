import constant from "../cofig/constant.js";
import orderService from "../services/orderService.js";
import axios from "axios";


const createOrder = async (req, res) => {
    
    try {

        const userId = req.user.id; // Assuming user ID is stored in req.user

        console.log("User ID:", userId);
        const orderData = req.body;
        orderData.user = userId; // Add user ID to order data

        if(orderData.paymentMethod==="KHALTI"){

          const totalAmount = orderData.totalAmount

          const options = {
              "return_url": "http://localhost:5173/dashboard",
              "website_url": "http://localhost:5173",
              "amount": totalAmount * 100, 
              "purchase_order_id": Date.now(),
              "purchase_order_name": `order-${Date.now()}`,
          }

          const result = await axios.post("https://dev.khalti.com/api/v2/epayment/initiate/", options,{
            headers: {
              'Authorization': `Key ${constant.KHALTI_SECRET_KEY}`,
              'Content-Type': 'application/json'
            }
          }
        )

        console.log(result.data);
        return res.status(200).send(result.data);
        }
    
        const data = await orderService.createOrder(orderData);

        console.log(data);

        res.status(200).json({ 
            message: "Order created successfully",
            data: data,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Error occurred while creating order");
    }

};

const getOrderById = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await orderService.getOrderById(id);
    res.status(200).json({
      message: "Order fetched successfully",
      data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Error occurred while fetching OrderId");
  }
};


const getOrderByUserId = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is stored in req.user

    const data = await orderService.getOrderByUserId(userId);
    res.status(200).json({
      message: "Users Orders fetched successfully",
      data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Error occurred while fetching orders for user");
  }
};


const updateOrderStatus = async (req, res) => {
  try{
    const orderId = req.params.id
    const status = req.body.orderStatus
    const data = await orderService.updateOrderStatus(orderId, status)
    res.status(200).json({
      message: "Order status updated successfully",
      data
    });
  } catch (error) {
    res.status(400).json({
      error: error.message
    })
  }
};


const updatePaymentStatus = async (req, res) => {
  try{
    const orderId = req.params.id
    const status = req.body.paymentStatus
    const data = await orderService.updatePaymentStatus(orderId, status)
    res.status(200).json({
      message: "Payment status updated successfully",
      data
    });
  }catch (error) {
    res.status(400).json({
      error: error.message
    })
}
};


export { createOrder, getOrderById, getOrderByUserId, updateOrderStatus, updatePaymentStatus}
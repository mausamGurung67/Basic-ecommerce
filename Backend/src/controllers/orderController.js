import orderService from "../services/orderService.js";


const createOrder = async (req, res) => {
    
    try {

        const userId = req.user.id; // Assuming user ID is stored in req.user

        console.log("User ID:", userId);
        const orderData = req.body;
        orderData.user = userId; // Add user ID to order data
    
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

export { createOrder };
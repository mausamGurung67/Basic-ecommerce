import productService from "../services/productService.js";


const createProduct = async (req, res)=>{

    try {
        const product = req.body

        if(!product){
            return res.status(400).send("Product data is required");
        }

        if(!product.price){
            return res.status(400).send("Product price is required");
        }

        const data = await productService.createProduct(product);

        res.status(200).json({
            message: "Product created successfully",
            data: data
        });
    }catch (error) {
        console.log(error.message);
        res.status(501).send("error occurred to create product");
    }
};


export { createProduct };



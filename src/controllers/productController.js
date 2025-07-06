import productService from "../services/productService.js";

const createProduct = async (req, res) => {
  try {
    const product = req.body;

    if (!product) {
      return res.status(400).send("Product data is required");
    }

    if (!product.price) {
      return res.status(400).send("Product price is required");
    }

    const data = await productService.createProduct(product);

    res.status(200).json({
      message: "Product created successfully",
      data: data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(501).send("error occurred to create product");
  }
};

const getAllProducts = async (req, res) => {
  try {

    console.log(req.query)

    const data = await productService.getAllProducts(req.query);

    res.status(200).json({
      message: "All products fetched successfully",
      data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Error occurred while fetching products");
  }
};

const getProductById = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await productService.getProductById(id);
    res.status(200).json({
      message: "Product fetched successfully",
      data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Error occurred while fetching product");
  }
};

const deleteProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await productService.deleteProductById(id);

    res.status(200).json({
      message: "Product deleted successfully",
      data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Error occurred while deleting product");
  }
};

const updateProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = req.body;

    const data = await productService.updateProductById(product, productId);
    res.status(200).json({
      message: "Product updated successfully",
      data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Error occurred while updating product");
  }
};
export {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProductById,
};

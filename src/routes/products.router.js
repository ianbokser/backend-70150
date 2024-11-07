import { Router } from "express";
import * as productController from "../controllers/product.controller.js";
import { productValidator } from "../middlewares/productValidator.js";
import { idValidator } from "../middlewares/idValidator.js"
import passport from "passport";
import { roleValidation } from "../middlewares/roleValidator.js";


const productRouter = Router();


productRouter.get("/", productController.getAllProducts);

productRouter.get("/:pid", productController.getProductById);

productRouter.post("/", productValidator, passport.authenticate("jwt", { session: false }), roleValidation(['admin']), productController.createProduct);

productRouter.post("/baseinicio", productController.createProduct); // un solo uso: para agregar los 45 productos de ejemplo

productRouter.put("/:pid", idValidator, passport.authenticate("jwt", { session: false }), roleValidation(['admin']), productController.updateProduct);

productRouter.delete("/:pid", passport.authenticate("jwt", { session: false }), roleValidation(['admin']), productController.deleteProduct)

export default productRouter;
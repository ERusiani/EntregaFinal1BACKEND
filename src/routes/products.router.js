import { Router } from "express";
import productsManager from "../Managers/mongo/ProductsManager.js";

const ProductsManager = new productsManager();

const router = Router();

router.get("/:page", async(req, res) => {
    const p = req.params.page.toString() || 1;
    const result = await ProductsManager.getProducts(p);
    if (result=="Error") {
        res.send({ status: "error", error: "Error" });
    }

    res.send({
        status: "success",
        payload: result.result,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.prevLink,
        nextLink: result.nextLink
    });
})

router.post("/", async(req, res) => {
    const data = req.body;
    if (!data.title || !data.description || !data.code || !data.price || !data.category) {
        res.send({ status: "error", error: "All data is required" })
    }else{
        const result = ProductsManager.addProduct(data);
        if(!result){
            res.send({ status: "error", error: "Product not created" });
        }
        res.send({ status: "success", payload: result });
    }
})


router.put("/:pid", async(req, res) => {
    const pid = req.params.pid;
    const data = req.body;

    const result = await ProductsManager.updateProduct(pid,data);
    if (result=="Error") {
        res.send({ status: "error", error: "Product not updated" })
    }
    res.send({ status: "success", payload: result });
})


router.delete("/:pid", async(req, res) => {
    const pid = req.params.pid;
    const result = await ProductsManager.deleteProduct(pid);
    if (result=="Error") {
        res.send({ status: "error", error: "Product not deleted" })
    }
    res.send({ status: "success", payload: result });
})

export default router;
import { Router } from "express";
import cartsManager from "../Managers/mongo/CartsManager.js";
import productsManager from "../Managers/mongo/ProductsManager.js";

const CartsManager = new cartsManager();

const router = Router();


router.get("/:cid", async(req, res) => {
    const cid = req.params.cid;

    const cart = await CartsManager.getCart(cid);
    if (!cart) {
        res.send({ status: "error", error: "Cart not found" });
    }
    res.send({ status: "success", payload: cart });
})

router.post("/", async(req, res) => {
    const result = await CartsManager.addCart();
    if (!result) {
        res.send({ status: "error", error: "Cart not created" });
    }
    res.send({ status: "success", payload: result });
})

router.post("/:cid/products/:pid", async(req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const qty = req.body.quantity || 1;
    const result = await CartsManager.addProduct(cid, pid, qty);
    if (result == "no cart") {
        res.send({ status: "error", error: "Cart not found" });
    }
    if (result == "no product") {
        res.send({ status: "error", error: "Product not found" });
    }
    if (result == "server error") {
        res.send({ status: "error", error: "Product not added" });
    }
    res.send({ status: "success", payload: result });

})

router.put("/:cid", async(req, res) => {
    const cid = req.params.cid;
    const data = req.body;

    const result = await CartsManager.updateCart(cid, data);
    if (!result) {
        res.send({ status: "error", error: "Can't edit product" });
    }
    res.send({ status: "success", payload: result });
})

router.put("/:cid/products/:pid", async(req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const qty = req.body.quantity;

    const result = await CartsManager.updateProductQuantity(cid, pid, qty);
    if (result == "no cart") {
        res.send({ status: "error", error: "Cart not found" });
    }
    if (result == "no product") {
        res.send({ status: "error", error: "Product not found" });
    }
    if (result == "server error") {
        res.send({ status: "error", error: "Can't edit products" });
    }
    res.send({ status: "success", payload: result });
})

router.delete("/:cid/products/:pid", async(req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;

    const result = await CartsManager.deleteProduct(cid, pid);
    if (result == "no cart") {
        res.send({ status: "error", error: "Cart not found" });
    }
    if (result == "no product") {
        res.send({ status: "error", error: "Product not found" });
    }
    if (result == "server error") {
        res.send({ status: "error", error: "Product not deleted" });
    }
    if (!result) {
        res.send({ status: "error", error: "Server error" });
    }
    res.send({ status: "success", payload: result });
})

router.delete("/:cid", async(req, res) => {
    const cid = req.params.cid;

    const result = await CartsManager.DeleteAllProducts(cid);
    if (result == "no cart") {
        res.send({ status: "error", error: "Cart not found" });
    }
    if (result == "server error") {
        res.send({ status: "error", error: "Product not deleted" });
    }
    res.send({ status: "success", payload: result });
})

export default router;
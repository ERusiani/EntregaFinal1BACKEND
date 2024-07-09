import express from "express";
import mongoose from 'mongoose';
import CartsRouter from "./routes/carts.router.js"
import ProductsRouter from "./routes/products.router.js";

const app = express();
const PORT = process.env.PORT||8080;
const connection = mongoose.connect('mongodb+srv://CoderUser:123@clustersito.8qdga2u.mongodb.net/store?retryWrites=true&w=majority&appName=Clustersito');

app.use(express.json());
app.use("/api/products",ProductsRouter);
app.use("/api/cart",CartsRouter);

app.listen(PORT, ()=>console.log(`Listening on ${PORT}`));
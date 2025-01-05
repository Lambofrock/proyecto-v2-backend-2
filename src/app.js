import path from "path";

import cookieParser from "cookie-parser";
import mongoose from 'mongoose';
import viewsRouter from "./routes/user.router.js";
import sessionRouter from "./routes/session.router.js";
import express from "express";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import dotenv from "dotenv";

const app = express();;
const uriMongo = 'mongodb://localhost:27017/prueba1';
const PRIVATE_KEY = "ClaveUltraSecreta1234yponernumerosraros";

dotenv.config();
const firmaCookie = process.env.FIRMA_COOKIE || 'firmacookie';
app.use(cookieParser(firmaCookie));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

mongoose.connect(uriMongo)
  .then(() => app.listen(8080, () => console.log("escuchando en el puerto 8080")),
    console.log("conectado a mongolico"))
  .catch((error) => console.error("error de conexion", error));

app.use("/", viewsRouter);
app.use("/api", sessionRouter);



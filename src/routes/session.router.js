import { Router } from "express";
import userServices from "../models/user.model.js";
import { generateToken, isValidPassword } from "../utils.js";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const newUser = new userServices(req.body);
    await newUser.save();
    res.json({ message: "Usuario creado" });
    res.status(201).send(newUser);
    console.log("Usuario creado");
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.log(error);
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = userServices.findOne({ email: email });
    if (!user) {
      return res.status(400).send({ message: "Usuario no registrado aca?" });
    }

    // if (!userServices.isValidPassword(user, req.body.password)) {
    //   return res.status(401).send({ message: "Contraseña incorrecta" });
    // }
    if (!isValidPassword(user, password)) {
      return res.status(401).send({ message: "Contraseña incorrecta" });
    }
    const jwt_token = generateToken({ user: user });
    res.cookie("currentUser", jwt_token, { httpOnly: true });

    res.json({ message: "sesion iniciada" });
    console.log("sesion iniciada");
  } catch (error) {
    res.status(500).send({ message: error.message });
    console.log(error);
  }
});

export default router;

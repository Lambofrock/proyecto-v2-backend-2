import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";

const PRIVATE_KEY = "ClaveUltraSecreta1234yponernumerosraros";

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

export const generateToken = (user) => {
  const token = jwt.sign(user, PRIVATE_KEY, { expiresIn: "24h" });
  return token;
};
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).send({
      error: "no esta registrado",
    });
  const token = authHeader.split(" ")[1];
  jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
    if (error) return res.status(403).send({ error: "no esta autorizado" });
    req.user = credentials.user;
    next();
  });
};

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

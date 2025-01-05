import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

export const authorization = (role) => {
  return async (req, res, next) => {
      if(!req.user) return res.status(401).send({ message: 'sin autorizacion' });
      if(req.user.role != role) 
          return res.status(403).send({ error: "no dijiste la palabra magica" });
      next();
  }
};
export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function(err, user, info) {
      if (err) return next(err);
      if (!user) {
        return res.status(401).send({ error: info.messages ? info.messages : info.toString() });
      }
      req.user = user;
      next();
    })(req, res, next);
  };
};


const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

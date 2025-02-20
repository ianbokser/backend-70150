import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const PRIVATE_KEY = process.env.JWT_SECRET;

export function generateToken(payload) {
  return jwt.sign(payload, PRIVATE_KEY, {
    expiresIn: "1h",
  });
}

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, PRIVATE_KEY);

    return decoded;
  } catch (error) {
    throw new Error("Token no valido");
  }
}
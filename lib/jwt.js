export const runtime = "nodejs";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;
export const generateToken = (payload) =>
  jwt.sign({ id: payload._id.toString(), email: payload.email, role: payload.role }, SECRET, {
    expiresIn: "1d",
  });

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    console.error("❌ JWT verification failed:", error.message);
    return null;
  }
};

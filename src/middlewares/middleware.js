import jwt from "jsonwebtoken";
import { env } from "../utils/env.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized. No token provided." });
    }
    const decoded = jwt.verify(token, env.JWT_SECRET);
   
    
    req.user = { userId: decoded.userId };
    

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

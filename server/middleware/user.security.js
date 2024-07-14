import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import { UserModel } from "../models/user.model.js";

const userAuthentication = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith("Bearer ")) {
      return res.status(401).json({ Message: "Please log-in first" });
    }

    const token = auth.replace("Bearer ", "");

    const decoded = jwt.verify(token, JWT_SECRET);

    // Find user from database based on decoded user ID.
    const user = await UserModel.findById(
      { _id: decoded._id },
      { password: 0 }
    );

    req.user = user;

    next();
  } catch (error) {
    console.log("Error occured in Authentication", error);
    res.status(500).json({ error: error.message });
  }
};

export default userAuthentication;
 
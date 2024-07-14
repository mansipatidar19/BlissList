import express from "express";
import { login, register } from "../controller/user.controller.js";

const user_router = express.Router();

user_router.post("/register", register);
user_router.post("/login", login);

export default user_router;

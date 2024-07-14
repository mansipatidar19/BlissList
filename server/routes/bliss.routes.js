import express from "express";
import {
  addTask,
  deleteTask,
  editTask,
  getAllTasks,
  getTask,
} from "../controller/blisslist.controller.js";
import userAuthentication from "../middleware/user.security.js";

const bliss_router = express.Router();

bliss_router.use(userAuthentication);
bliss_router.post("/addTask", addTask);
bliss_router.get("/getTask/:id", getTask);
bliss_router.get("/getAllTasks", getAllTasks);
bliss_router.patch("/editTask/:id", editTask);
bliss_router.delete("/deleteTask/:id", deleteTask);

export default bliss_router;

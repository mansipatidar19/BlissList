import mongoose from "mongoose";
import { MONGO_URI } from "./env.js";

export default function dbConnect() {
  mongoose.connect(MONGO_URI);
  const db = mongoose.connection;
  db.on("error", () =>
    console.log("Error occured while connecting to database!")
  );
  db.once("open", () => {
    console.log("Successfully connected to MongoDB");
  });
}

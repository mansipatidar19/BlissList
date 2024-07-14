import express from "express";
import cors from "cors";
import { PORT } from "./config/env.js";
import dbConnect from "./config/db.js";
import user_router from "./routes/user.routes.js";
import bliss_router from "./routes/bliss.routes.js";

const app = express();

dbConnect();

app.use(express.json());
app.use(cors());
app.use("/api/v1/user", user_router);
app.use("/api/v1/blisslist", bliss_router);

app.listen(PORT, () => {
  console.log(`Server started @ port: ${PORT}`);
});

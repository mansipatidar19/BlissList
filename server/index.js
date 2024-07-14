import express from "express";
import cors from "cors";
import { PORT } from "./config/env.js";
import dbConnect from "./config/db.js";
import user_router from "./routes/user.routes.js";
import bliss_router from "./routes/bliss.routes.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000", // or ['http://localhost:3000', 'https://your-other-domain.com']
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

dbConnect();

app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/v1/user", user_router);
app.use("/api/v1/blisslist", bliss_router);

app.listen(PORT, () => {
  console.log(`Server started @ port: ${PORT}`);
});

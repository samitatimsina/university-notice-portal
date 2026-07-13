import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import noticeRoutes from "./routes/notice.route.js";
import holidayRoutes from "./routes/holiday.routes.js";
import eventRoutes from "./routes/event.routes.js";
import path from "path";

const app = express();

app.use(cors());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", dashboardRoutes);
app.use("/api", noticeRoutes);
app.use("/api", holidayRoutes);
app.use("/api", eventRoutes);
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

app.get("/", (req, res) => {
  res.send("Server is running");
});

export default app;
import express from "express";
import cors from "cors";
import userRoutes from "./routes/users";
import authRouter from "./routes/auth";
import jobsRouter from "./routes/jobs";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/jobs", jobsRouter);
app.use("/users", userRoutes);

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

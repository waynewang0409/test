import express from "express";
import myRoutes from "./routes/routes.js";
import cors from "cors";

const PORT = 8800;
const HOST = '0.0.0.0';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", myRoutes);

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});
import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParse from "body-parser";
import Router from "../src/routes/index";
dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(urlencoded({ extended: true }));
app.use(bodyParse.json());
app.use(cors());
Router(app);
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

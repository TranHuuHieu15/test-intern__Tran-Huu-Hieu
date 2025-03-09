import express, { Request, Response } from "express";
import 'dotenv/config'
import router from "./routes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // for parsing application/json

router(app);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

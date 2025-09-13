import app from "./src/app.js";
import dotenv from "dotenv";
import connectDB from "./src/db/db.js";
dotenv.config();

connectDB();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
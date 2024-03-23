import mongoose from "mongoose";
import { MONGO_URL } from "../config/config.js";

const serverSelectionTimeoutMS = 5000; //5s Time Out

async function connect() {
  try {
    mongoose.set("strictQuery", true);

    const db = await mongoose.connect(`${MONGO_URL}`, {
      serverSelectionTimeoutMS,
    });
    console.log("DB is connected...!!");
    return db;
  } catch (error) {
    console.log(error?.message);
    process.exit();
  }
}

export default connect;

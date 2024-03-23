import mongoose from "mongoose";
import { Patient } from "../models/patient.model.js";

mongoose.connect(`mongodb://localhost:27017/dpm`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const renameDbFieldName = async () => {
  try {
    const result = await Patient.updateMany({}, [
      { $set: { prescriptionList: "$prescriptionLists" } },
      { $unset: "prescriptionLists" }
    ]);

    console.log(`Migration completed successfully: ${result?.acknowledged}`);
  } catch (error) {
    console.error("Error during migration:", error);
  } finally {
    mongoose.disconnect();
  }
};

renameDbFieldName();

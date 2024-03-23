import { model } from 'mongoose';

const Patient = model('Patient');

async function addIsActiveField() {
  try {
    // Update existing documents to add the isActive field
    const result = await Patient.updateMany(
      { isActive: { $exists: false } },
      { $set: { isActive: true } }
    );
    console.log(result?.acknowledged);
  } catch (error) {
    console.error('Error updating documents:', error);
  }
}

export { addIsActiveField };

import mongoose from "mongoose";

const dbConnector = async (dbCredentials) => {
  try {
    await mongoose.connect(dbCredentials);
    console.log("\nSuccessfully connected to the database");
  } catch (e) {
    console.log(e.message);
  }
};

export { dbConnector };

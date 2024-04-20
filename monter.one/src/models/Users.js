import mongoose from "mongoose";

mongoose.set("strictQuery", false);

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  location: {
    type: String,
  },
  workDetails: {
    type: String,
  },
});

// creating and exporting the User model
const User = mongoose.model("User", userSchema);
export default User;

import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
  verified: {
    type: Boolean,
  },
});

// Implementing register and login methods using the model.statics method
// register
userSchema.statics.register = async function (email, password) {
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error(
      "This email already exists, please register with a different email!"
    );
  }

  // hashing the password for new user using bcrypt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    password: hashedPassword,
    verified: false,
  });

  return user;
};

// login method
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("User not found, please register...");
  }

  // check if user has verified account
  if (!user.verified) {
    throw Error("Please verify your account with the OTP in your email!");
  }

  const expectedPassword = await bcrypt.compare(password, user.password);

  if (!expectedPassword) {
    throw Error("Incorrect password! Try again...");
  }

  // otherwise
  return user;
};

// creating and exporting the User model
const User = mongoose.model("User", userSchema);
export default User;

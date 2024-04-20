import Users from "../models/Users.js";

const updateUser = async (req, res) => {
  const userId = req.params.userId;

  const user = await Users.findOne({ _id: userId });
  // check if user has verified account
  if (!user.verified) {
    throw Error("Please verify your account with the OTP in your email!");
  }

  const { age, location, workDetails } = req.body;
  try {
    const user = await Users.findOneAndUpdate(
      { _id: userId },
      { age, location, workDetails },
      { new: true }
    );
    res.status(201).json({
      status: "Update successful",
      message: "User information update successfully",
      payload: {
        email: user.email,
        age,
        location,
        workDetails,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "FAILED",
      message: error.message,
    });
  }
  //   const { username } = req.body;
  //   try {
  //     let user = await Users.findOne({ username });
  //     if (!user) {
  //       user = await Users.create({ username });
  //       console.log("\nUser Info. Updated Successfully!");
  //     }
  //     let response = {
  //       username: user.username,
  //       _id: user._id,
  //     };
  //     return res.status(201).json(response);
  //   } catch (error) {
  //     console.log("Error creating User!");
  //     console.log(error);
  //     return res.status(400).json(error);
  //   }
  //   return;
};

const fetchUserData = async (req, res) => {
  //   try {
  //     let users = await Users.find({});
  //     if (!users) {
  //       console.log("\nNo Users Fetched from DB!");
  //       return res.status(400).json("No Users registered in Database");
  //     }
  //     return res.status(201).json(users);
  //   } catch (error) {
  //     console.log("Error creating User!");
  //     console.log(error);
  //     return res.status(400).json(error);
  //   }
  //   return;
};

export { updateUser, fetchUserData };
//   otherwise valid otp
// await Users.updateOne({ _id: userId }, { verified: true });

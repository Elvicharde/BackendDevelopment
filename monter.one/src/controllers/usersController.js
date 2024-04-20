// import { Users } from "../models/Users.js";

// const createUser = async (req, res) => {
//   const { username } = req.body;

//   try {
//     let user = await Users.findOne({ username });

//     if (!user) {
//       user = await Users.create({ username });
//       console.log("\nUser Created!");
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
// };

// const fetchUsers = async (req, res) => {
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
// };

// export { createUser, fetchUsers };

/* Author: Oguntuase Victor
   e-Mail: freelanceel0@gmail.com
   Description: This is a backend Node and Express app for the intern backend developer role with Monter.one.
                It implements various APIs that allows user registration, login, and profile update.
*/

// importing relevant modules
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

const app = express();

// using environment variables to store sensitive credentials
dotenv.config();

const PORT = process.env.PORT || 50001; // chooses port in .env or defaults to 3001 when not available.
const dbCreds = process.env.dbCreds;

//middleware use
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// serving static html page for minimal frontend
// app.use("/public", express.static(`${process.cwd()}/public`));

// routes
import { authenticationsRouter } from "./src/routes/authentications.route.js";
import { usersRouter } from "./src/routes/users.route.js";

// Controllers
import { dbConnector } from "./src/controllers/dbConnector.js";

// configuring endpoints
app.use("/api/v1/auth", authenticationsRouter);

app.use("/api/v1/users", usersRouter);

// handle requests to all undefined endpoints
app.use("*", (_, res) =>
  res.status(404).json({
    error: "Not Found",
  })
);

// starting the server on available/specified port
const start = async () => {
  try {
    await dbConnector(dbCreds); // connecting to mongoDb via the DB controller
    app.listen(PORT, () =>
      console.log(`\n[Server started]: Listening on Port ${PORT} ...\n`)
    );
  } catch (error) {
    res.status(500).json({
      error: "\nServer startup failed!",
    });

    console.log(`\n[Failed!]: ${error.message}`);
  }
};

// start the server and connect to database.
start();

// production error handler
const HTTP_SERVER_ERROR = 500;
app.use(function (err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  return res.status(err.status || HTTP_SERVER_ERROR).render("500");
});

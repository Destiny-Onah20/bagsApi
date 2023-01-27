const express = require("express");
const { getAll } = require("../controllers/bags");
const { signUp, logIn, verifyUser, forgot, confirm } = require("../controllers/users");

const adminRoutes = express.Router();

adminRoutes.route("/user").post(signUp);
adminRoutes.route("/login").post(logIn);
adminRoutes.route("/verifyUser/:userId").post(verifyUser);
adminRoutes.route("/password").post(forgot);
adminRoutes.route("/password/:userId/:token").post(confirm);
adminRoutes.route("/users").get(getAll)



module.exports = adminRoutes;
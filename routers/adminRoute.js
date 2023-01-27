const express = require("express");
const { createBag, delBag } = require("../controllers/bags");
const authUser = require("../helpers/auth")

const bagRoute = express.Router();

bagRoute.route("/post/:userId").post( authUser, createBag);
bagRoute.route("/post/:userId/:bagId").delete( authUser, delBag); 

module.exports = bagRoute;
const express = require("express");
const { payment, complete, cancel } = require("../middleware/payment");

const payRouter = express.Router();

payRouter.post("/", payment);
payRouter.get("/complete", complete);
payRouter.get("/cancel", cancel);

module.exports = payRouter;

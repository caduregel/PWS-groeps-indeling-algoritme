const { Router } = require("express");
const exampleController = require("../controllers/exampleController");

const exampleRouter = Router();

exampleRouter.get("/", (req, res) => res.send("Example"));

exampleRouter.get("/:exampleId", (req, res) => {
  exampleController(req, res)
});

module.exports = exampleRouter;
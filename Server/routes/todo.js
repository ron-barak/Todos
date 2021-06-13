const express = require("express");
const { TodoModel, validTodo } = require("../models/todoModel");
const router = express.Router();
const _ = require("lodash");

//----GET ALL----//
router.get("/all", async (req, res) => {
  let sortBy = req.query.sort ? req.query.sort : "_id";
  let val = " ";
  req.query.sort == "true" ? (sortBy = "_id") && (val = -1) : (val = 1);
  let data = await TodoModel.find({}).sort({ [sortBy]: val });
  res.json(data);
});

//----ADD TODO----//
router.post("/add", async (req, res) => {
  let validet = validTodo(req.body);
  if (validet.error) return res.status(400).json(validet.error.details);
  try {
    TodoModel.insertMany([req.body]);
    res.send(req.body);
  } catch (err) {
    res.json(err);
  }
});

//---SEARCH----//
router.get("/search", async (req, res) => {
  let searchQ = req.query.q;
  let expSearchQ = new RegExp(searchQ, "i");
  try {
    let data = await TodoModel.find({
      $or: [{ todoTitle: expSearchQ }, { todoBody: expSearchQ }],
    });
    res.json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

//---TODO INFO BY ID----//
router.get("/:id", async (req, res) => {
  try {
    let data = await TodoModel.findOne({ _id: req.params.id });
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

//----DELETE TODO----//
router.delete("/:id", async (req, res) => {
  let todo = await TodoModel.findByIdAndRemove({ _id: req.params.id });
  if (!todo)
    return res.status(400).send("The todo with the given ID was not found.");
  res.json(todo);
});

//----EDIT TODO----//
router.put("/edit/:id", async (req, res) => {
  let validet = validTodo(req.body);
  if (validet.error) return res.status(400).json(validet.error.details);
  try {
    let data = await TodoModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;

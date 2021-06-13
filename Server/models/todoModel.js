const mongoose = require("mongoose");
const Joi = require("joi");

const todoSchme = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  todoBody: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  todoTitle: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  createdAt: { type: Date, default: Date.now },
});

exports.TodoModel = mongoose.model("todos", todoSchme);

exports.validTodo = (_todo) => {
  const schema = Joi.object({
    todoTitle: Joi.string().min(2).max(1024),
    todoBody: Joi.string().min(2).max(1024),
  });
  return schema.validate(_todo);
};

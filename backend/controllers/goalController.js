import asyncHandler from "express-async-handler";
import Goal from "../models/goalModel.js";

/* 
@desc create goal
 @route POST api/goals
 @access PRIVATE
 */
const createGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("please add a text field");
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(goal);
});

/* 
  @desc get goal
   @route GET api/goals
   @access PRIVATE
   */
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});

/* 
  @desc update goal
   @route PUT api/goals/:id
   @access PRIVATE
   */
const updateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("goal not found");
  }

  // check for the user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Logged in user matched goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorize");
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

/* 
  @desc delete goal
   @route DELTE api/goals/:id
   @access PRIVATE
   */
const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("goal not found");
  }
  // check for the user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Logged in user matched goal user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorize");
  }
  await Goal.findOneAndDelete({ _id: req.params.id });
  res.status(200).json({ id: req.params.id });
});

export { createGoals, getGoals, updateGoals, deleteGoals };

import { ListModel } from "../models/blisslist.model.js";

// Add task
export const addTask = async (req, res) => {
  try {
    const { task, affirmation, gratitude } = req.body;
    if (!task) {
      return res.status(400).json({ Message: "Adding task is neccessary!" });
    }
    const taskby = req.user._id;
    const sameTask = await ListModel.find({ taskby, task });
    if (sameTask.length > 0) {
      return res
        .status(404)
        .json({ Message: "Task already added, cannot add same task twice!" });
    }
    const newTask = new ListModel({
      task,
      affirmation,
      gratitude,
      taskby,
    });
    await newTask.save();
    res.status(201).json({ Message: "Task added successfully!" });
  } catch (error) {
    console.log("Error in adding task", error);
    res.status(500).json({ Message: "Internal Server Error!" });
  }
};

// Get single task
export const getTask = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await ListModel.findById(id);
    res.status(200).json({ Task: task });
  } catch (error) {
    console.log("Error getting task:", error);
    res.status(500).json({ Message: "Internal Server Error!" });
  }
};

// Get all tasks
export const getAllTasks = async (req, res) => {
  try {
    const taskby = req.user._id;
    const tasks = await ListModel.find({ taskby, completed:false });
    res.status(200).json({ Tasks: tasks });
  } catch (error) {
    console.log("Error occured in getting all tasks:", error);
    res.status(500).json({ Message: "Internal Server Error!" });
  }
};

// Edit task
export const editTask = async (req, res) => {
  try {
    const id = req.params.id;
    const { task, affirmation, gratitude, completed } = req.body;
    const taskInDB = await ListModel.findById(id);
    if (!taskInDB) {
      return res.status.json({ Message: "Task not found!" });
    }
    const updateFields = {};
    if (task && task !== taskInDB.task) updateFields.task = task;
    if (affirmation && affirmation !== taskInDB.affirmation)
      updateFields.affirmation = affirmation;
    if (gratitude && gratitude !== taskInDB.gratitude)
      updateFields.gratitude = gratitude;
    if (typeof completed === "boolean" && completed !== taskInDB.completed)
      updateFields.completed = completed;
    if (Object.keys(updateFields).length === 0) {
      return res
        .status(400)
        .json({ Message: "Please edit atleast one field!" });
    }
    const updatedTask = await ListModel.findByIdAndUpdate(id, updateFields, {
      new: true,
    });
    res.status(200).json({ Message: "Task edited successfully!", updatedTask });
  } catch (error) {
    console.log("Error occured in editing task:", error);
    res.status(500).json({ Message: "Internal Server Error!" });
  }
};

// Delete Task
export const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).json({ Message: "Task not found!" });
    }
    const deletedTask = await ListModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ Message: "Task deleted successfully!", deletedTask });
  } catch (error) {
    console.log("Error occured in deleting task", error);
    res.status(500).json({ Message: "Internal Server Error!" });
  }
};

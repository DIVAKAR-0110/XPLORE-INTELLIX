const express = require("express");
const router = express.Router();

const Admin = require("../models/Admin");
const Employee = require("../models/Employee");
const Task = require("../models/Task");

// 🔹 Admin Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });

  if (!admin) return res.send("Admin not found");

  if (admin.password !== password) return res.send("Invalid password");

  res.send("Login successful");
});

// 🔹 Get Employees
router.get("/employees", async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

// 🔹 Approve Employee
router.put("/approve/:id", async (req, res) => {
  await Employee.findByIdAndUpdate(req.params.id, {
    isApproved: true
  });

  res.send("Employee approved");
});

// 🔹 Assign Task
router.post("/task", async (req, res) => {
  const { title, description, employeeId } = req.body;

  const newTask = new Task({
    title,
    description,
    employeeId
  });

  await newTask.save();

  res.send("Task assigned");
});

module.exports = router;
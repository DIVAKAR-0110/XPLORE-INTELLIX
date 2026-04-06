const express = require("express");
const router = express.Router();

const Employee = require("../models/Employee");
const Task = require("../models/Task");

// 🔹 Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password, department } = req.body;

    if (!name || !email || !phone || !password || !department) {
      return res.send("All fields required");
    }

    const existing = await Employee.findOne({ email });
    if (existing) {
      return res.send("Email already exists");
    }

    const newEmployee = new Employee({
      name,
      email,
      phone,
      password,
      department
    });

    await newEmployee.save();

    res.send("Registered successfully");
  } catch (err) {
    res.send("Error");
  }
});

// 🔹 Employee Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await Employee.findOne({ email });

  if (!user) return res.send("User not found");

  if (!user.isApproved) return res.send("Wait for admin approval");

  if (user.password !== password) return res.send("Wrong password");

  res.json(user);
});

router.get("/tasks/:id", async (req, res) => {
  const tasks = await Task.find({ employeeId: req.params.id });
  res.json(tasks);
});

router.put("/task/:id", async (req, res) => {
  await Task.findByIdAndUpdate(req.params.id, {
    status: req.body.status
  });

  res.send("Task updated");
});

module.exports = router;
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/task")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const employeeRoutes = require("./routes/employeeside");
const adminRoutes = require("./routes/adminside");

app.use("/", employeeRoutes);       
app.use("/admin", adminRoutes);     

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
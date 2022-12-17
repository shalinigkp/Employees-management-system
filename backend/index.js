const express = require("express");
var mongoose = require('mongoose');

const app= express();
const cors=require('cors');
app.use(cors())
app.use(express.json())

const connectDB = require('./dbConnect/db');
// Connect Database
connectDB();

const User=require('./models/user')
const Employee=require('./models/employee')
const Designation=require('./models/designation')
const Department=require('./models/department')

app.get('/', (req, res) => res.send('Hello world!'));

//---------------Create User----------------

app.post("/api/register", async (req, res) => {
  console.log(req.body);
  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: "Duplicate email" });
  }
});

//--------------Login User----------------

app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    return { status: "error", error: "invalid login" };
  }
  if (req.body.password == user.password) {
    return res.json({ status: "ok", user: user.name });
  } else {
    return res.json({ status: "error", error: "invalid password" });
  }
});

//---------------Get Employee List--------------------------

app.get("/api/getEmployeeList", async (req, res) => {
  try {
    const employee = await Employee.find();
    return res.json({ status: "ok", employeeList: employee });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

//--------------Add Employee-------------------------------

  app.post("/api/addEmployee", async (req, res) => {
    console.log(req.body);
    try {
      await Employee.create({
        _id: mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        dateOfJoining: req.body.dateOfJoining,
        salary: req.body.salary,
        designation: req.body.designation,
        department: req.body.department,
      });
      res.json({ status: "ok" });
    } catch (err) {
      console.log(err);
      res.json({ status: "error" });
    }
  });

  //---------------Update Employee---------------

app.post("/api/updateEmployee", async (req, res) => {
  var id = mongoose.Types.ObjectId(req.body.id);
  try {
    await Employee.updateOne(
      { _id: id },
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          dateOfBirth: req.body.dateOfBirth,
          dateOfJoining: req.body.dateOfJoining,
          salary: req.body.salary,
          designation: req.body.designation,
          department: req.body.department,
        },
      }
    );
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error" });
  }
});

//------------------------Delete Employee----------------

app.get("/api/deleteEmployeeRecord/:id", async (req, res) => {
  try {
    var id = mongoose.Types.ObjectId(req.params.id);
    const employee = await Employee.deleteOne({ _id: id });
    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error" });
  }
});

//--------------Get Department List------------------

  app.get("/api/getDepartmentList", async (req, res) => {
    try {
      const employee = await Department.find();
      console.log(employee);
      return res.json({ status: "ok", deptList: employee });
    } catch (error) {
      console.log(error);
      res.json({ status: "error", error: "invalid token" });
    }
  });

//--------------Add Department--------------------

  app.post("/api/addDepartment", async (req, res) => {
    console.log(req.body);
    try {
      await Department.create({
        departmentName: req.body.departmentName,
      });
      res.json({ status: "ok" });
    } catch (err) {
      console.log(err);
      res.json({ status: "error" });
    }
  });

  //--------------Get Designation---------------------

app.get("/api/getDesignationList", async (req, res) => {
  try {
    const employee = await Designation.find();
    console.log(employee);
    return res.json({ status: "ok", desgList: employee });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

//---------------Add Designation--------------------

app.post("/api/addDesignation", async (req, res) => {
  console.log(req.body);
  try {
    await Designation.create({
      designationName: req.body.designationName,
    });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
    res.json({ status: "error" });
  }
});

module.exports = app;
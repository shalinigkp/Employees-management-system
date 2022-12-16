const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  _id:{
type:mongoose.Types.ObjectId,
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  
  dateOfBirth:{
    type:String,
  },
  dateOfJoining:{
    type:String,
  },
  salary: {
    type: String,
  },
  designation:{
    type:String,
  },
  department:{
    type:String,
  },
 
});

const Employee = mongoose.model('Employees', EmployeeSchema);
module.exports = Employee
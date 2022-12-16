const mongoose=require('mongoose');

const departmentSchema=new mongoose.Schema({
departmentName:{
    type:String,
    required:true,
},
});
const Department=mongoose.model('departments',departmentSchema);
module.exports=Department;
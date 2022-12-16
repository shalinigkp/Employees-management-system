const mongoose=require('mongoose')
const designationSchema=new mongoose.Schema({
designationName:{
    type:String,
    required:true,
},
});
const Designation=mongoose.model('designation',designationSchema);
module.exports=Designation;
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  fatherName:{
    type:String,
    required: true
  },
  mobile: {
    type: String,
    required: true
    //unique: true
  },
  email :{
    type : String,
    //required :true
  },
  applicantType :{
    type : String,
    required :true
  },
  areaType :{
    type : String,
    required :true
  },
  district:{
    type:String,
    required:true
  },
  address1 :{
    type : String,
    required :true
  },
  address2 :{
    type : String,
    //required :true
  },
  pincode :{
    type : String,
    required :true
  },
  road_urban_local_body_name :{
    type : String,
    required :true
  },
  road_ward_no :{
    type : String,
    required :true
  },
  road_locality :{
    type : String,
    required :true
  },
  road_cuttingReason :{
    type : String,
    required :true
  },
  road_category :{
    type : String,
    required :true
  },
  road_totalcost :{
    type : String,
    required :true
  },
  payment_status:{
    type:Boolean,
    default:false,
  },
  consumerCode:{
    type:String,
    required:true,
  },
});

module.exports = User = mongoose.model('form', UserSchema);

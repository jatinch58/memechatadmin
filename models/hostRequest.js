const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const hostuserSchema = new Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Gender: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  AadharCardNo: {
    type: String,
    required: true,
  },
  drivingLicenseNo: {
    type: String,
  },
  aadharimage: {
    type: String,
    //required:true
  },
  userId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "complete", "cancel"],
    default: "pending",
  },
  videoProfile: {
    type: String,
  },
});
module.exports = mongoose.model("Hostuser", hostuserSchema);

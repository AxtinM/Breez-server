import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
  client_id: {
    type: String,
    required: true,
    lowercase: true,
  },
  device: {
    type: String,
    default: "breez",
  },
  status: {
    type: Boolean,
    default: 0,
  },
});

const deviceModel = mongoose.model("device", deviceSchema);

export default deviceModel;

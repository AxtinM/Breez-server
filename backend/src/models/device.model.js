import { model, Schema } from "mongoose";

// for use for another time

const breezSchema = new Schema({
  device_name: {
    type: String,
    required: false,
    defualt: "Breez",
  },
  mac_address: {
    type: String,
  },
  device_type: {
    type: String,
    default: "Breez",
  },
  status: {
    type: Boolean,
    default: 0,
  },
});

const breezModel = model("Breez", deviceSchema);

export default deviceModel;

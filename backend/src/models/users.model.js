import { model, Schema } from "mongoose";

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  gadgets: [
    {
      type: Schema.Types.ObjectId,
    },
  ],
});

export const UserModel = model(User, userSchema);

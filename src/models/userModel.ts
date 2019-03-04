import { userImp } from "./../interfaces/userImp";
import { baseModel } from "./baseModel";
import { Schema } from "mongoose";

const userSchema = new Schema({
  userId: { type: String, required: true },
  unionId: { type: String },
  userName: { type: String },
  avatarUrl: { type: String },
  gender: { type: Number },
  province: { type: String },
  city: { type: String },
  country: { type: String },
  session: { type: Schema.Types.Mixed },
  createdTime: { type: Number },
  updatedTime: { type: Number },
  loc: { type: Schema.Types.Mixed, index: true}
});



userSchema.on("index", error => {
  console.error(error);
})

userSchema.pre("save", next => {
  // const user = this;
  // if (typeof user.createdTime == "undefined" || !user.createdTime) {
  //   user.createdTime = Date.now();
  // }
  next();
});

export class userModel extends baseModel<userImp> {}

export const userCollection = new userModel("mp_users", userSchema.index({loc: "2dsphere"}));

export default {
  userModel,
  userCollection
};

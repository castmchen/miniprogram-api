import { sessionDomain } from "./../domains/sessionDomain";
import { Document } from "mongoose";

export interface userImp extends Document {
  userId: String;
  unionId: String;
  userName: String;
  gender: Number;
  avatarUrl: String;
  province: String;
  city: String;
  country: String;
  session: sessionDomain;
  createdTime: Number;
  updatedTime: Number;
  longitude: Number;
  latitude: Number;
}

import mongoose from "mongoose";

class chatModel {
  constructor() {}

  public message: string;
  public userId: string;
  public contactId: string;
  public errcode: string;
  public errorMessage: string;
}

export default {
  chatModel,
  chatSchema: new mongoose.Schema(chatModel)
};

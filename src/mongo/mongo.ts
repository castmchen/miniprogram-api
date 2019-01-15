import mongoose from "mongoose";
import chatModel from "../models/chatModel";

export class mongo {
  private dbUrl: string;
  private dbName: string;

  constructor(mongoConfig) {
    this.dbUrl = mongoConfig.url;
    this.dbName = mongoConfig.db;
  }

  public mongoSetup() {
    if (this.dbUrl == "" || this.dbName == "") {
      console.error(
        "An error has been occured when start DB, Details: DB's connection string is null"
      );
      return null;
    }
    let connectionString = `${this.dbUrl}/${this.dbName}`;
    mongoose.Promise = global.Promise;
    mongoose.connect(connectionString);
    mongoose.Connection.on("error", error => {
      console.error(
        `An error has been occured when connect DB, Details: ${error}`
      );
    });
    mongoose.Connection.Once("open", () => {
      console.log(`DB ${connectionString} has been connect successfully`);
    });

    return mongoose;
  }
}

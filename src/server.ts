import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import * as errorHandler from "errorhandler";
import * as methodOverride from "method-override";
import { DB_CONFIG } from "./constant";
import mongoose = require("mongoose");
//#region  routers

import { IndexRouter } from "./routes/index";
import { WeChatRouter } from "./routes/wechat";

//#endregion

export class Server {
  public app: express.Application;

  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    this.app = express();
    this.setupPlugin();
  }

  public setupPlugin() {
    this.setupconfig();

    mongoose.Promise = global.Promise;
    mongoose
      .connect(
        `${DB_CONFIG.ConnectionString}/${DB_CONFIG.DBName}`,
        { useNewUrlParser: true }
      )
      .then(db => {
        console.log("Mongo DB has been connect succfully.");
        this.setuprouters();
      })
      .catch(err => {
        console.error(
          `An error has been occured while initing router config, Details: ${err}`
        );
      });
  }

  public setupconfig() {
    this.app.use(express.static(path.join(__dirname, "public")));
    this.app.set("trust proxy", ip => {
      return ip != null || ip != "";
    });

    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "pug");

    this.app.use(logger("dev"));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(methodOverride());
    this.app.use(
      (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        err.status = 404;
        next(err);
      }
    );
    this.app.use(errorHandler());
  }

  public setuprouters() {
    var indexRouter: express.Router = express.Router();
    IndexRouter.create(indexRouter);
    this.app.use(indexRouter);

    var wechatRouter: express.Router = express.Router();
    WeChatRouter.create(wechatRouter);
    this.app.use("/wechat", wechatRouter);
  }
}

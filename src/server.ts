import { IndexRouter } from "./routes/index";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import * as errorHandler from "errorhandler";
import * as methodOverride from "method-override";
import { mongo } from "./mongo/mongo";
import { DB_CONFIG } from "./constant";

export class Server {
  public app: express.Application;

  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    this.app = express();
    // this.setupMongo();
    this.config();
    this.routers();
    this.api();
  }

  public api() {}

  public setupMongo() {
    let mongoClient = new mongo(DB_CONFIG).mongoSetup();
    if (mongoClient != null) {
      this.app.set("mongoose", mongoClient);
    }
  }

  public config() {
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

  public routers() {
    let router: express.Router = express.Router();
    IndexRouter.create(router);
    this.app.use(router);
  }
}

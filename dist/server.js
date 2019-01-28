"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const errorHandler = require("errorhandler");
const methodOverride = require("method-override");
const constant_1 = require("./constant");
const mongoose = require("mongoose");
const index_1 = require("./routes/index");
const wechat_1 = require("./routes/wechat");
class Server {
    static bootstrap() {
        return new Server();
    }
    constructor() {
        this.app = express();
        this.setupPlugin();
    }
    setupPlugin() {
        this.setupconfig();
        mongoose.Promise = global.Promise;
        mongoose
            .connect(`${constant_1.DB_CONFIG.ConnectionString}/${constant_1.DB_CONFIG.DBName}`, { useNewUrlParser: true })
            .then(db => {
            console.log("Mongo DB has been connect succfully.");
            this.setuprouters();
        })
            .catch(err => {
            console.error(`An error has been occured while initing router config, Details: ${err}`);
        });
    }
    setupconfig() {
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
        this.app.use((err, req, res, next) => {
            err.status = 404;
            next(err);
        });
        this.app.use(errorHandler());
    }
    setuprouters() {
        var indexRouter = express.Router();
        index_1.IndexRouter.create(indexRouter);
        this.app.use(indexRouter);
        var wechatRouter = express.Router();
        wechat_1.WeChatRouter.create(wechatRouter);
        this.app.use("/wechat", wechatRouter);
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map
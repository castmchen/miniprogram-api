"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./routes/index");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const errorHandler = require("errorhandler");
const methodOverride = require("method-override");
const mongo_1 = require("./mongo/mongo");
const constant_1 = require("./constant");
class Server {
    static bootstrap() {
        return new Server();
    }
    constructor() {
        this.app = express();
        this.config();
        this.routers();
        this.api();
    }
    api() { }
    setupMongo() {
        let mongoClient = new mongo_1.mongo(constant_1.DB_CONFIG).mongoSetup();
        if (mongoClient != null) {
            this.app.set("mongoose", mongoClient);
        }
    }
    config() {
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
    routers() {
        let router = express.Router();
        index_1.IndexRouter.create(router);
        this.app.use(router);
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map
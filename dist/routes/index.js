"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./router");
class IndexRouter extends router_1.BaseRouter {
    constructor() {
        super();
    }
    static create(router) {
        router.get("/", (req, res, next) => {
            new IndexRouter().index(req, res, next);
        });
    }
    index(req, res, next) {
        this.title = "Home | Ts Blog";
        let options = {
            message: "welcome to the Ts Blog"
        };
        this.render(req, res, "index", options);
    }
}
exports.IndexRouter = IndexRouter;

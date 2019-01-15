"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./router");
const crypto = require("crypto");
class IndexRouter extends router_1.BaseRouter {
    constructor() {
        super();
    }
    static create(router) {
        router.get("/", (req, res, next) => {
            new IndexRouter().index(req, res, next);
        });
        router.get("/service", (req, res, next) => {
            const token = "castm";
            let signature = req.query.signature;
            let timestap = req.query.timestamp;
            let nonce = req.query.nonce;
            let echostr = req.query.echostr;
            let arrayStr = new Array(token, timestap, nonce).sort().join("");
            let sha1Code = crypto.createHash("sha1");
            let code = sha1Code.update(arrayStr).digest("hex");
            console.log(code);
            console.log(signature);
            res.send(code === signature ? echostr : "error");
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
//# sourceMappingURL=index.js.map
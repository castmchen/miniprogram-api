"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("./router");
const uuid = require("node-uuid");
class IndexRouter extends router_1.BaseRouter {
    constructor() {
        super();
    }
    static create(router) {
        router.get("/", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            new IndexRouter().index(req, res);
        }));
    }
    index(req, res) {
        this.title = "I LOVE PAPA";
        let options = {
            message: "WELCOME TO PAPA SITE, THERE HAS WHAT YOU NEED"
        };
        this.render(req, res, "index", options);
    }
}
exports.IndexRouter = IndexRouter;
//# sourceMappingURL=index.js.map
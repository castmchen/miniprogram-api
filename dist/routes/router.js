"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseRouter {
    addScript(src) {
        this.scripts.push(src);
        return this;
    }
    render(req, res, view, options) {
        res.locals.BASE_URL = "/";
        res.locals.title = this.title;
        res.locals.scripts = this.scripts;
        res.render(view, options);
    }
}
exports.BaseRouter = BaseRouter;

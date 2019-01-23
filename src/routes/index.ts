import mongoose from "mongoose";
import { BaseRouter } from "./router";
import { NextFunction, Request, Response, Router } from "express";

export class IndexRouter extends BaseRouter {
  constructor() {
    super();
  }

  public static create(router: Router) {
    router.get("/", (req: Request, res: Response, next: NextFunction) => {
      new IndexRouter().index(req, res, next);
    });
  }

  public index(req: Request, res: Response, next: NextFunction) {
    this.title = "Home | Ts Blog";

    let options = {
      message: "welcome to the Ts Blog"
    };
    this.render(req, res, "index", options);
  }
}

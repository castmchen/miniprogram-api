import { userCollection } from "./../models/userModel";
import { BaseRouter } from "./router";
import { NextFunction, Request, Response, Router } from "express";
import { sessionDomain } from "../domains/sessionDomain";
const uuid = require("node-uuid");

export class IndexRouter extends BaseRouter {
  constructor() {
    super();
  }

  public static create(router: Router) {
    router.get("/", async (req: Request, res: Response, next: NextFunction) => {
      new IndexRouter().index(req, res);
    });
  }

  public index(req: Request, res: Response) {
    this.title = "I LOVE PAPA";

    let options = {
      message: "WELCOME TO PAPA SITE, THERE HAS WHAT YOU NEED"
    };
    this.render(req, res, "index", options);
  }
}

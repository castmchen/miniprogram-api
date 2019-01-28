import { userCollection } from "./../models/userModel";
import { BaseRouter } from "./router";
import { NextFunction, Request, Response, Router } from "express";
const uuid = require("node-uuid");

export class IndexRouter extends BaseRouter {
  constructor() {
    super();
  }

  public static create(router: Router) {
    router.get("/", async (req: Request, res: Response, next: NextFunction) => {
      // var session = {
      //   sessionId: "",
      //   sessionValue: ""
      // };
      // session.sessionId = uuid.v1();
      // session.sessionValue = "123";
      // let userInfo = {
      //   userId: "1",
      //   unionId: "",
      //   session: session,
      //   userName: "",
      //   avatarUrl: "",
      //   createdTime: Date.now(),
      //   updatedTime: Date.now(),
      //   longtitude: 0,
      //   latitude: 0
      // };
      // userCollection.create(userInfo);
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

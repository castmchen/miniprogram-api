import mongoose from "mongoose";
import { BaseRouter } from "./router";
import { NextFunction, Request, Response, Router } from "express";
const crypto = require("crypto");

export class IndexRouter extends BaseRouter {
  constructor() {
    super();
  }

  public static create(router: Router) {
    router.get("/", (req: Request, res: Response, next: NextFunction) => {
      new IndexRouter().index(req, res, next);
    });

    router.get(
      "/service",
      (req: Request, res: Response, next: NextFunction) => {
        const token = "castm";
        let signature = req.query.signature;
        let timestap = req.query.timestamp;
        let nonce = req.query.nonce;
        let echostr = req.query.echostr;

        let arrayStr = new Array(token, timestap, nonce).sort().join("");
        let sha1Code = crypto.createHash("sha1");
        let code = sha1Code.update(arrayStr).digest("hex");
        console.log(code)
        console.log(signature)
        res.send(code === signature ? echostr : "error");
      }
    );
  }

  public index(req: Request, res: Response, next: NextFunction) {
    this.title = "Home | Ts Blog";

    let options = {
      message: "welcome to the Ts Blog"
    };
    this.render(req, res, "index", options);
  }
}

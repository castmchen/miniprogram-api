import { WECHAT_DEV_OBJ, WECHAT_LOGIN_URL } from "./../constant";
import { BaseRouter } from "./router";
import { Router, Request, Response, NextFunction } from "express";
const crypto = require("crypto");
var rp = require("request-promise");

export class WeChatRouter extends BaseRouter {
  public static create(router: Router) {
    //#region 微信登录

    router.post(
      "/loginwechat",
      async (req: Request, res: Response, next: NextFunction) => {
        if (req.body != null && req.body.code) {
          WECHAT_DEV_OBJ.code = req.body.code;
          let options = {
            uri: WECHAT_LOGIN_URL,
            json: true
          };
          await rp(options).then(res => {
            debugger;
            console.log(res);
            if (res) {
            }
          });

          console.log("again");
        }
      }
    );

    //#endregion

    //#region 客服消息

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
        console.log(code);
        console.log(signature);
        res.send(code === signature ? echostr : "error");
      }
    );

    router.post(
      "/service",
      (req: Request, res: Response, next: NextFunction) => {}
    );

    //#endregion
  }
}

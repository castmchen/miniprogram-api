import { WECHAT_LOGIN_URL } from "./../constant";
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
          let targerUrl =  WECHAT_LOGIN_URL + req.body.code;
          let options = {
            uri: targerUrl,
            json: true
          };
          var session_key = '';
          await rp(options).then(res => {
            if (res) {
              session_key = res.session_key;
              let openid = res.openid;
            }
          });
          res.send({sessionId : session_key})
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

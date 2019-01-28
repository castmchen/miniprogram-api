import { userCollection } from "./../models/userModel";
import { WECHAT_LOGIN_URL } from "./../constant";
import { BaseRouter } from "./router";
import { Router, Request, Response, NextFunction } from "express";
import { sessionDomain } from "../domains/sessionDomain";
import { userImp } from "../interfaces/userImp";
const uuid = require("node-uuid");
const crypto = require("crypto");
const rp = require("request-promise");

export class WeChatRouter extends BaseRouter {
  public static create(router: Router) {
    //#region 微信登录

    router.post(
      "/login",
      async (req: Request, res: Response, next: NextFunction) => {
        if (req.body != null && req.body.code) {
          let targerUrl = WECHAT_LOGIN_URL + req.body.code;
          let options = {
            uri: targerUrl,
            json: true
          };

          var session = new sessionDomain();
          await rp(options).then(async res => {
            if (res && !res.code) {
              var currentUser: userImp = null;
              await userCollection.findOne({ userId: res.openid }).then(p => {
                currentUser = p;
              }).catch(err => {
                  console.error(`An error has been occured while getting user information, Details: ${err}`);
                });
              if (currentUser != null) {
                session = currentUser.session;
                currentUser.updatedTime = Date.now();
                userCollection.updateOne(
                  { userId: currentUser.userId },
                  currentUser
                );
              } else {
                session.sessionId = uuid.v1();
                session.sessionValue = res.session_key;
                let userInfo = {
                  userId: res.openid,
                  unionId:
                    typeof res.unionid != "undefined" && res.unionid != null
                      ? res.unionid
                      : "",
                  session: session,
                  createdTime: Date.now(),
                  updatedTime: Date.now()
                };
                userCollection.create(userInfo);
              }
            }
          });
          res.send({ sessionId: session.sessionId });
        }
      }
    );

    //#endregion

    //#region 检查和更新用户信息

    router.post(
      "/checkandupdateuser",
      async (req: Request, res: Response, next: NextFunction) => {
        var userInfo: userImp;
        await userCollection
          .findOneByWhere(
            `this.session.sessionId == "${req.body.userInfo.sessionId}"`
          )
          .then(p => {
            userInfo = p;
          }).catch(err => {
            console.error(`An error has been occured while getting user information, Details: ${err}`);
            res.send({
              message: "user information has been modified, check fail."
            });
          });
        var sha1Code = crypto.createHash("sha1");
        console.log(req.body.userInfo.signature)
        var signatureSelf = sha1Code.update(req.body.userInfo.rawData + userInfo.session.sessionValue).digest('hex');
        console.log(signatureSelf)
        if (
          req.body.userInfo.signature === signatureSelf
        ) {
          let postUserInfo = req.body.userInfo.userInfo;
          userInfo.userName = postUserInfo.nickName;
          userInfo.avatarUrl = postUserInfo.avatarUrl;
          userInfo.gender = postUserInfo.gender;
          userInfo.province = postUserInfo.province;
          userInfo.city = postUserInfo.city;
          userInfo.country = postUserInfo.country;
          userCollection.updateOne({ userId: userInfo.userId }, userInfo);
          res.send({ message: "success" });
        } else {
          res.send({
            message: "user information has been modified, check fail."
          });
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

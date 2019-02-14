import { BaseRouter } from "./router";
import { Router, Request, Response, NextFunction } from "express";
import { userCollection } from "./../models/userModel";
import { userImp } from "./../interfaces/userImp";

export class UserRouter extends BaseRouter {
  public static create(router: Router) {
    //#region 通过id获取用户

    router.get(
      "/getuserbyid",
      async (req: Request, res: Response, next: NextFunction) => {
        var currentUser: userImp = null;
        await userCollection
          .findOne({ userId: req.body.userId })
          .then(userInfo => {
            currentUser = userInfo;
          });

        res.send(currentUser);
      }
    );

    //#endregion

    //#region 通过sessionid获取用户

    router.get(
      "/getuserbysessionid",
      async (req: Request, res: Response, next: NextFunction) => {
        var currentUser: userImp = null;
        await userCollection
          .findOneBySessionId(req.body.sessionId)
          .then(userInfo => {
            currentUser = userInfo;
          });

        res.send(currentUser);
      }
    );

    //#endregion

    //#region 更新用戶地理坐標

    router.post(
      "/updateuserlocation",
      (req: Request, res: Response, next: NextFunction) => {
        userCollection
          .findOne({ userId: req.body.userId })
          .then(userInfo => {
            if (userInfo) {
              userInfo.longitude = req.body.location.lng;
              userInfo.latitude = req.body.loaction.lat;
              userInfo.updatedTime = Date.now();
              return userCollection.updateOne(
                { userId: userInfo.userId },
                userInfo
              );
            }
          })
          .then(result => {
            console.log(
              `User information has been updated, Details: ${result}`
            );
          })
          .catch(err => {
            console.error(
              `An error has been occured while updating user information, Details: ${err}`
            );
          });
        res.send("success");
      }
    );

    //#endregion
  }
}

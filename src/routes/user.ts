import { BaseRouter } from "./router";
import { Router, Request, Response, NextFunction } from "express";
import { userCollection } from "./../models/userModel";
import { userImp } from "./../interfaces/userImp";
import { buildTencentGetLocationApi } from "../constant";
const rp = require("request-promise");

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
          .findOne({ userId: req.body.locationInfo.userId })
          .then(userInfo => {
            if (userInfo) {
              userInfo.longitude = req.body.lng;
              userInfo.latitude = req.body.lat;
              userInfo.updatedTime = Date.now();
              return userCollection.updateOne(
                { userId: userInfo.userId },
                userInfo
              );
            }
          })
          .then(result => {
            console.log(
              `User ${req.body.userId}'s location information longitude ${
                req.body.lng
              } latitude ${req.body.lat} has been updated successfully.`
            );
          })
          .catch(err => {
            console.error(
              `An error has been occured while updating user's location information, Details: ${err}`
            );
          });
        res.send({ message: "success" });
      }
    );

    //#endregion

    //#region 获取用户地理坐标

    router.get(
      "/getuserlocation",
      async (req: Request, res: Response, next: NextFunction) => {
        var result = { lng: null, lat: null };
        var currentUser = null;
        await userCollection
          .findOne({ userId: req.query.userId })
          .then(userInfo => {
            if (userInfo && userInfo.longitude && userInfo.latitude) {
              return { lng: userInfo.longitude, lat: userInfo.latitude };
            } else {
              currentUser = userInfo;
              return rp({
                uri: buildTencentGetLocationApi(userInfo.city ? userInfo.city : '大连'),
                json: true
              });
            }
          })
          .then(res => {
            if (res.data && res.data.length) {
              result = res.data[0].location
              currentUser.longitude = result.lng;
              currentUser.latitude = result.lat;
              userCollection.update({ userId: req.query.userId }, currentUser);
            } else {
              result = res;
            }
            return;
          })
          .catch(err => {
            console.error(
              `An error has been occured while getting user's location, Details: ${err}`
            );
          });
        res.send(result);
      }
    );

    //#endregion
  }
}

//#region  MONGO

export const DB_CONFIG = {
  ConnectionString: "mongodb://localhost:27017",
  DBName: "mp"
};

//#endregion

//#region  WECHAT

export const WECHAT_APPKEY = "wx2f55a2c27813d009";

export const WECHAT_SECRET = "65e5e18400211213179c51bb29e1fe43";

export const WECHAT_LOGIN_URL = `https://api.weixin.qq.com/sns/jscode2session?appid=${WECHAT_APPKEY}&secret=${WECHAT_SECRET}&grant_type=authorization_code&js_code=`;

//#endregion

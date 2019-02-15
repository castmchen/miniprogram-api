import { encode } from "punycode";

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

//#region TENCENT MAP

const TENCENTMAP_COMMON_KEY = "d84d6d83e0e51e481e50454ccbe8986b";
export function buildTencentGetLocationApi(place: String) {
  let TENCENTMAP_GETLOACTION_URL = encodeURI(`https://apis.map.qq.com/ws/place/v1/search?keyword=${place}&key=${TENCENTMAP_COMMON_KEY}&boundary=region(${place},0)`);
  return TENCENTMAP_GETLOACTION_URL;
}

//#endregion

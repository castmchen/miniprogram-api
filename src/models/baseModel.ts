import {
  Document,
  Schema,
  ModelUpdateOptions,
  QueryFindOneAndUpdateOptions,
  Model,
  model
} from "mongoose";

export class baseModel<T extends Document> {
  private _model: Model<T>;
  private _schema: Schema;

  constructor(collection: string, schema: Schema) {
    if (!collection) {
      throw new Error(
        "current collection is null, collection name must be spcified"
      );
    }
    this._schema = schema;
    this._model = model<T>(collection, this._schema);
  }

  create(obj: Object): Promise<T> {
    return this._model.create(obj);
  }

  findById(id: String): Promise<T> {
    return this._model.findById(id).exec();
  }

  findOne(query: Object): Promise<T> {
    return this._model.findOne(query).exec();
  }

  findByQuery(query: Object): Promise<T[]> {
    return this._model.find(query).exec();
  }

  findByWhere(query: string | Function): Promise<T[]> {
    return this._model
      .find()
      .$where(query)
      .exec();
  }

  findOneByWhere(query: string | Function): Promise<T> {
    return new Promise((resolve, reject) => {
      this._model
        .find()
        .$where(query)
        .exec((err, res) => {
          if (err) {
            console.error(
              `An error has been occured while getting user information, Details: ${err}`
            );
            return reject(err);
          } else {
            return resolve(res[0]);
          }
        });
    });
  }

  findOneBySessionId(sessionId: string | Function): Promise<T> {
    return new Promise((resolve, reject) => {
      this._model
        .find()
        .$where(`this.session.sessionId == "${sessionId}"`)
        .exec((err, res) => {
          if (err) {
            console.error(
              `An error has been occured while getting user information by sessionid => ${sessionId}, Details: ${err}`
            );
            return reject(err);
          } else {
            return resolve(res[0]);
          }
        });
    });
  }

  findByNear(query: object, circleDocument: object): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this._model
        .find(query)
        .$where("loc")
        .circle(circleDocument)
        .exec((err, res) => {
          if (err) {
            console.error(
              `An error has been occured while getting information by circle approach, Details: ${err}`
            );
            return reject(err);
          } else {
            return resolve(res);
          }
        });
    });
  }

  update(
    query: Object,
    obj: Object,
    options?: ModelUpdateOptions
  ): Promise<any> {
    return this._model.update(query, obj, options).exec();
  }

  updateOne(query: Object, obj: Object) {
    return this._model.updateOne(query, obj).exec();
  }

  findOneAndUpdate(
    query: Object,
    obj: Object,
    options?: QueryFindOneAndUpdateOptions
  ): Promise<T> {
    return this._model.findOneAndUpdate(query, obj, options).exec();
  }

  removeOne(query: Object): Promise<any> {
    return this._model.remove(query).exec();
  }
}

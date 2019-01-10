import { NextFunction, Request, Response } from "express";
import { Resolver } from "dns";

export class BaseRouter {
  protected title: string;
  private scripts: string[];

  public addScript(src: string): BaseRouter {
    this.scripts.push(src);
    return this;
  }

  public render(req: Request, res: Response, view: string, options?: Object) {
    res.locals.BASE_URL = "/";
    res.locals.title = this.title;
    res.locals.scripts = this.scripts;
    res.render(view, options);
  }
}

import { RequestHandler, Router } from 'express';

import { handleError } from './error';

export const RootRoute = Router();

enum RequestMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  OPTIONS = 'options',
  HEAD = 'head',
}

interface RouteInterface {
  path: string;
  method: RequestMethod;
  middlewares: RequestHandler[];
  propertyKey: string;
  paging?: 'body' | 'query';
}

interface MiddlewareInterface {
  middlewares: RequestHandler[];
  propertyKey: string;
}

/* -------------------------------------------------------------------------- */
/*                               Class decorator                              */
/* -------------------------------------------------------------------------- */
export const APP = (routePrefix: string): ClassDecorator => {
  return (targetClass: any) => {
    defineRoute(targetClass, routePrefix);
  };
};

/* -------------------------------------------------------------------------- */
/*                               Handle metadata                              */
/* -------------------------------------------------------------------------- */
function defineRoute(targetClass: any, routePrefix: string): void {
  if (!Reflect.hasOwnMetadata('routes', targetClass)) {
    Reflect.defineMetadata('routes', [], targetClass);
  }

  if (!Reflect.hasOwnMetadata('middlewares', targetClass)) {
    Reflect.defineMetadata('middlewares', [], targetClass);
  }

  const rootPath = routePrefix;
  const instance = new targetClass();

  const routes = Reflect.getMetadata('routes', targetClass) as RouteInterface[];
  const middlewares = Reflect.getMetadata('middlewares', targetClass) as MiddlewareInterface[];

  routes.forEach((route: RouteInterface) => {
    route.middlewares = route.middlewares ? route.middlewares : [];

    const methodMiddleware = middlewares.find((item) => item.propertyKey === route.propertyKey);

    if (methodMiddleware) {
      route.middlewares = route.middlewares.concat(methodMiddleware.middlewares);
    }

    RootRoute[route.method](rootPath + route.path, route.middlewares, handleError(instance[route.propertyKey]));
  });
}

export const Method = (path: string, middlewares: RequestHandler[], method: RequestMethod): MethodDecorator => {
  return (target: ClassDecorator, propertyKey: string) => {
    if (!Reflect.hasOwnMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor);
    }
    const routes: RouteInterface[] = Reflect.getMetadata('routes', target.constructor);

    routes.push({ path, method, middlewares, propertyKey });

    Reflect.defineMetadata('routes', routes, target.constructor);
  };
};

export const Get = (path: string, middlewares?: RequestHandler[]): MethodDecorator => {
  return Method(path, middlewares, RequestMethod.GET);
};

export const Post = (path: string, middlewares?: RequestHandler[]): MethodDecorator => {
  return Method(path, middlewares, RequestMethod.POST);
};

export const Put = (path: string, middlewares?: RequestHandler[]): MethodDecorator => {
  return Method(path, middlewares, RequestMethod.PUT);
};

export const Delete = (path: string, middlewares?: RequestHandler[]): MethodDecorator => {
  return Method(path, middlewares, RequestMethod.DELETE);
};

export const Options = (path: string, middlewares?: RequestHandler[]): MethodDecorator => {
  return Method(path, middlewares, RequestMethod.OPTIONS);
};

export const Head = (path: string, middlewares?: RequestHandler[]): MethodDecorator => {
  return Method(path, middlewares, RequestMethod.HEAD);
};

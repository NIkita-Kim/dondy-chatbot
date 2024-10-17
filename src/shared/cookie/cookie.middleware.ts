import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { USER_ID_COOKIE_NAME } from './cookie.const';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';

@Injectable()
export class CookieMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (!req.cookies[USER_ID_COOKIE_NAME]) {
      res.cookie(USER_ID_COOKIE_NAME, randomStringGenerator(), {
        httpOnly: true,
        maxAge: 1000 * 3600 * 24 * 30 * 12, // One year
      });
    }

    next();
  }
}

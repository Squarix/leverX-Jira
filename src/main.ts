import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import {join} from "path";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import JWTRedisSession = require("jwt-redis-session");
import Redis = require("redis");

"redis";
import * as hbs from "hbs";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(bodyParser.json({limit: '10mb'}));
  app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
  app.use(cookieParser())

  // redis -- jwt
  let redisClient = Redis.createClient();
  app.use(JWTRedisSession({
    client: redisClient,
    secret: 'secretniyKey',
    keyspace: 'sess:',
    maxAge: 60*60*24,
    algorithm: 'HS256',
    requestKey: 'jwtSession',
    requestArg: 'jwtToken'
  }));

  app.setViewEngine('hbs');
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, 'modules'));

  hbs.registerPartials(join(__dirname, '..', 'views', 'layouts'));

  await app.listen(3000);


}
bootstrap().then(() => console.log('Server is running on port 3000'));

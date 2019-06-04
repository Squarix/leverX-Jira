import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import {join} from "path";
import * as bodyParser from "body-parser";
import * as hbs from "hbs";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(bodyParser.json({limit: '10mb'}));
  app.use (bodyParser.urlencoded({limit: '10mb', extended: true}));

  app.setViewEngine('hbs');
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, 'modules'));

  hbs.registerPartials(join(__dirname, '..', 'views', 'layouts'));

  await app.listen(3000);


}
bootstrap().then(() => console.log('Server is running on port 3000'));

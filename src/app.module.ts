import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from "./modules/auth/auth.module";
import { ProjectsModule } from "./modules/projects/projects.module";
import { TasksModule } from "./modules/tasks/tasks.module";
import { HandlebarsAdapter, MailerModule } from "@nest-modules/mailer";
import { join } from "path";


@Module({
  imports: [
    AuthModule, UsersModule, ProjectsModule, TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'squarix',
      password: '123456',
      database: 'jira_development',
      entities: [ __dirname + '/**/*.entity{.ts,.js}' ],
      synchronize: true,
    }),
    MailerModule.forRoot({
      transport: 'smtps://thesquarixv@yandex.ru:v23052000v@smtp.yandex.ru',
      defaults: {
        from:'thesquarixv@yandex.ru',
      },
      template: {
        dir: join(__dirname,'mailer','templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}

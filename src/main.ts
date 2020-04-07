import * as env from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';
import * as session from 'express-session';
import * as passport from 'passport';

env.config();

async function bootstrap() {
  const logger = new Logger("bootstrap");
  const app = await NestFactory.create(AppModule);
  // Authentication & Session
  app.use(session({
    secret: process.env.AUTH_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true
    }
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  // Cors
  app.enableCors();
  const port = process.env.PORT || config.server.port;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UrlModule } from './url_shortener/url.shortener.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UrlModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

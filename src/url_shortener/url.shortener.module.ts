import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from './url.shortener.entitie';
import { UrlController } from './url.shortener.controller';
import { Urlservice } from './url.shortener.service';

@Module({
  imports: [TypeOrmModule.forFeature([Url])],
  providers: [Urlservice],
  controllers: [UrlController],
})
export class UrlModule {}

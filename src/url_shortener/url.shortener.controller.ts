import { Body, Controller, Get, Param, Post, Redirect } from '@nestjs/common';
import { Urlservice } from './url.shortener.service';
import { Url } from './url.shortener.entitie';
@Controller('url')
export class UrlController {
  constructor(private readonly urlService: Urlservice) {}
  @Post('')
  async create(@Body('longUrl') longUrl: string): Promise<Url> {
    return this.urlService.findUrl(longUrl);
  }
  @Get(':code')
  @Redirect()
  async route(@Param('code') code: string) {
    const originalUrl = await this.urlService.routeUrl(code);
    return { url: originalUrl };
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from './url.shortener.entitie';
import { config } from 'dotenv';
import base62 from 'base62';
config();
@Injectable()
export class Urlservice {
  constructor(
    @InjectRepository(Url) private readonly urlRepository: Repository<Url>,
  ) {}
  encode(id: number) {
    return base62.encode(id);
  }

  decode(id: string): number {
    return base62.decode(id);
  }

  async findUrl(longUrl: string): Promise<Url> {
    const url = await this.urlRepository.findOne({
      where: { originalUrl: longUrl },
    });
    if (url) {
      return url;
    } else {
      return this.createShortUrl(longUrl);
    }
  }

  async createShortUrl(longUrl: string): Promise<Url> {
    // Let database auto-generate ID
    const url = this.urlRepository.create({ originalUrl: longUrl });
    const savedUrl = await this.urlRepository.save(url);

    const shortCode = this.encode(savedUrl.id);
    const shortUrl = `${process.env.DOMAIN_NAME}/url/${shortCode}`;

    // Update with short URL
    savedUrl.newUrl = shortUrl;
    await this.urlRepository.save(savedUrl);

    return savedUrl;
  }

  async routeUrl(shortCode: string): Promise<string> {
    const id = this.decode(shortCode);
    const url = await this.urlRepository.findOne({
      select: ['originalUrl'],
      where: { id },
    });
    if (!url) {
      throw new NotFoundException('url not found');
    } else {
      return url.originalUrl;
    }
  }
}

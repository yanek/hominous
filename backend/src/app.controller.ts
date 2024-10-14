import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('robots.txt')
  robots(): string {
    return 'User-agent: *\nDisallow: /';
  }
}

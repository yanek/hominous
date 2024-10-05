import { Module } from '@nestjs/common';
import { LinksController } from './links/links.controller';
import { LinksService } from './links/links.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from './links/link.entity';
import { LinksModule } from './links/links.module';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/category.entity';
import { CategoriesService } from './categories/categories.service';
import { CategoriesController } from './categories/categories.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'sqlite',
          database: configService.get<string>('DATABASE_PATH'),
          entities: [Link, Category],
          synchronize: configService.get<string>('NODE_END') === 'development',
        };
      },
    }),
    LinksModule,
    CategoriesModule,
  ],
  controllers: [LinksController, CategoriesController],
  providers: [LinksService, CategoriesService],
})
export class AppModule {}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { ChangeCategoryLabelDto, CreateCategoryDto } from './category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  /**
   * Finds all categories.
   *
   * @returns A promise that resolves to an array of all categories.
   */
  @Get()
  async findAll(): Promise<Category[]> {
    return await this.categoriesService.findAll();
  }

  /**
   * Finds a category by its ID.
   *
   * @param id The ID of the category to find.
   * @returns A promise that resolves to the category with the given ID, or null if no such category exists.
   */
  @Get(':id')
  async find(@Param('id') id: number): Promise<Category | null> {
    return await this.categoriesService.find(id);
  }

  /**
   * Creates a new category.
   *
   * @param dto The data to use for creating the category.
   * @returns A promise that resolves to the newly created category.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateCategoryDto): Promise<Category> {
    return await this.categoriesService.create(dto);
  }

  /**
   * Updates a category.
   *
   * @param id The ID of the category to update.
   * @param dto The data to use for updating the category.
   */
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: number,
    @Body() dto: ChangeCategoryLabelDto,
  ): Promise<Category> {
    return await this.categoriesService.update(id, dto);
  }

  /**
   * Deletes a category.
   *
   * @param id The ID of the category to delete.
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number): Promise<void> {
    await this.categoriesService.remove(id);
  }
}
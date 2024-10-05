import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';

/**
 * Service for managing categories.
 *
 * Categories are used to group links together. They have a label and an order.
 * The order can be used to sort the categories in the UI.
 */
@Injectable()
export class CategoriesService {
  constructor(private dataSource: DataSource) {}

  /**
   * Finds all categories.
   *
   * @returns A promise that resolves to an array of all categories.
   */
  async findAll(): Promise<Category[]> {
    return this.dataSource.getRepository(Category).find();
  }

  /**
   * Finds a category by its ID.
   *
   * @param id The ID of the category to find.
   * @returns A promise that resolves to the category with the given ID, or null if no such category exists.
   */
  async find(id: number): Promise<Category | null> {
    return this.dataSource.getRepository(Category).findOneBy({ id });
  }

  /**
   * Creates a new category.
   *
   * @param dto The data to use for creating the category.
   * @returns A promise that resolves to the newly created category.
   */
  async create(dto: CreateCategoryDto): Promise<Category> {
    const category: Category = new Category();
    category.label = dto.label;
    category.order = dto.order;
    await this.dataSource.getRepository(Category).save(category);
    return category;
  }

  /**
   * Updates a category.
   *
   * @param dto The data to use for updating the category.
   * @throws Error If the category with the given ID does not exist.
   */
  async update(dto: UpdateCategoryDto): Promise<void> {
    const category: Category | null = await this.find(dto.id);

    if (!category) {
      throw new Error(`Category with id ${dto.id} not found`);
    }

    category.label = dto.label;
    category.order = dto.order;
    await this.dataSource.getRepository(Category).save(category);
  }

  /**
   * Deletes a category.
   *
   * @param id The ID of the category to delete.
   * @throws Error If the category with the given ID does not exist.
   */
  async remove(id: number): Promise<void> {
    const category: Category | null = await this.find(id);

    if (!category) {
      throw new Error(`Category with id ${id} not found`);
    }

    await this.dataSource.getRepository(Category).remove(category);
  }
}

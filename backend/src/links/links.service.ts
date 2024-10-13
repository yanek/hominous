import { Injectable, NotFoundException } from '@nestjs/common';
import { Link } from './link.entity';
import { DataSource } from 'typeorm';
import { Category } from '../categories/category.entity';
import { CreateLinkDto, UpdateLinkDto } from './link.dto';

/**
 * Service for managing links.
 *
 * Links are used to store URLs and their labels. They are grouped together by
 * categories.
 */
@Injectable()
export class LinksService {
  constructor(private dataSource: DataSource) {}

  /**
   * Finds all links.
   *
   * @returns A promise that resolves to an array of all links.
   */
  async findAll(): Promise<Link[]> {
    return this.dataSource.getRepository(Link).find();
  }

  /**
   * Finds all links for a given category.
   *
   * @param id The ID of the category for which to find the links.
   * @returns A promise that resolves to an array of all links for the given category.
   */
  async findAllByCategory(id: number): Promise<Link[]> {
    return this.dataSource
      .getRepository(Link)
      .createQueryBuilder('link')
      .leftJoinAndSelect('link.category', 'category')
      .where('category.id = :id', { id })
      .getMany();
  }

  /**
   * Finds a link by its ID.
   *
   * @param id The ID of the link to find.
   * @returns A promise that resolves to the link with the given ID, or null if no such link exists.
   */
  async find(id: number): Promise<Link | null> {
    return this.dataSource.getRepository(Link).findOneBy({ id });
  }

  /**
   * Creates a new link.
   *
   * @param dto The data to use for creating the link.
   * @returns A promise that resolves to the newly created link.
   */
  async create(dto: CreateLinkDto): Promise<Link> {
    const link: Link = new Link();
    link.url = dto.url;
    link.label = dto.label;
    link.category = new Category();
    link.category.id = dto.categoryId;
    await this.dataSource.getRepository(Link).save(link);
    return link;
  }

  /**
   * Updates a link.
   *
   * @param id The ID of the link to update.
   * @param dto The data to use for updating the link.
   * @throws Error If the link with the given ID does not exist.
   */
  async update(id: number, dto: UpdateLinkDto): Promise<Link> {
    const link: Link | null = await this.find(id);

    if (!link) {
      throw new NotFoundException(`Link with id ${id} not found`);
    }

    link.url = dto.url;
    link.label = dto.label;
    await this.dataSource.getRepository(Link).save(link);
    return link;
  }

  /**
   * Deletes a link.
   *
   * @param id The ID of the link to delete.
   * @throws Error If the link with the given ID does not exist.
   */
  async remove(id: number): Promise<void> {
    const link: Link | null = await this.find(id);

    if (!link) {
      throw new NotFoundException(`Link with id ${id} not found`);
    }

    await this.dataSource.getRepository(Link).remove(link);
  }
}

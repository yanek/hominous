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
import { LinksService } from './links.service';
import { Link } from './link.entity';
import { CreateLinkDto, UpdateLinkDto } from './link.dto';

@Controller('links')
export class LinksController {
  constructor(private linksService: LinksService) {}

  /**
   * Finds all links.
   *
   * @returns A promise that resolves to an array of all links.
   */
  @Get()
  async findAll(): Promise<Link[]> {
    return await this.linksService.findAll();
  }

  /**
   * Finds all links by category.
   *
   * @param id The ID of the category to find links for.
   * @returns A promise that resolves to an array of all links in the category.
   */
  @Get('category/:id')
  async findAllByCategory(@Param('id') id: number): Promise<Link[]> {
    return await this.linksService.findAllByCategory(id);
  }

  /**
   * Finds a link by its ID.
   *
   * @param id The ID of the link to find.
   * @returns A promise that resolves to the link with the given ID, or null if no such link exists.
   */
  @Get(':id')
  async find(@Param('id') id: number): Promise<Link | null> {
    return await this.linksService.find(id);
  }

  /**
   * Creates a new link.
   *
   * @param createLinkDto The data to use for creating the link.
   * @returns A promise that resolves to the newly created link.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createLinkDto: CreateLinkDto): Promise<Link> {
    return await this.linksService.create(createLinkDto);
  }

  /**
   * Updates a link.
   *
   * @param updateLinkDto The data to use for updating the link.
   * @throws Error If the link with the given ID does not exist.
   */
  @Put()
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Body() updateLinkDto: UpdateLinkDto): Promise<void> {
    await this.linksService.update(updateLinkDto);
  }

  /**
   * Deletes a link.
   *
   * @param id The ID of the link to delete.
   * @throws Error If the link with the given ID does not exist.
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number): Promise<void> {
    await this.linksService.remove(id);
  }
}

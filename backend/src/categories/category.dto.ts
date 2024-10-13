import { IsInt, IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @Length(2, 30)
  label: string;
}

export interface UpdateCategoryDto {
  id: number;
  label: string;
  order: number;
}

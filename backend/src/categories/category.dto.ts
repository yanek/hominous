import { IsInt, IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @Length(2, 30)
  label: string;
}

export class ChangeCategoryLabelDto {
  @IsString()
  @Length(2, 30)
  label: string;
}

export class ChangeCategoryOrderDto {
  @IsInt()
  order: number;
}

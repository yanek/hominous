import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateLinkDto {
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsString()
  @Length(2, 30)
  label: string;

  @IsInt()
  @IsPositive()
  categoryId: number;
}

export class UpdateLinkDto {
  @IsInt()
  @IsPositive()
  id: number;

  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsString()
  @Length(2, 30)
  label: string;

  @IsInt()
  @IsPositive()
  categoryId: number;
}

export interface CreateCategoryDto {
  label: string;
  order: number;
}

export interface UpdateCategoryDto {
  id: number;
  label: string;
  order: number;
}

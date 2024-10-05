export interface CreateLinkDto {
  url: string;
  label: string;
  categoryId: number;
}

export interface UpdateLinkDto {
  id: number;
  url: string;
  label: string;
  categoryId: number;
}

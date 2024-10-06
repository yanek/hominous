import { Category } from './category.ts';

export interface Link {
  id: number;
  url: string;
  label: string;
  category: Category;
}

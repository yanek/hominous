import { Category } from '../types/category.ts';
import LinkList from './LinkList.tsx';
import CategoryItem from './CategoryItem.tsx';

interface CategoryProps {
  category: Category;
}

function Section({ category }: CategoryProps) {
  return (
    <section className="mb-8 last:mb-2 first:mt-2">
      <CategoryItem category={category} />
      <LinkList categoryId={category.id} />
    </section>
  );
}

export default Section;

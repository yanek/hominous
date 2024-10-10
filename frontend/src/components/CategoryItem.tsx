import { EditModeContext } from '../contexts/EditModeContext.ts';
import { useContext } from 'react';
import EditCategoryForm from './EditCategoryForm.tsx';
import { Category } from '../types/category.ts';

interface CategoryItemProps {
  category: Category;
}

function CategoryItem({ category }: CategoryItemProps) {
  const isEditMode = useContext(EditModeContext);

  return isEditMode ? (
    <div className="flex gap-2">
      <EditCategoryForm category={category}></EditCategoryForm>
      <button
        className="h-6 hover:text-ctp-red"
        // onClick={() => onOrderChange(category.id, category.order - 1)}
      >
        [up]
      </button>
      <button
        className="h-6 hover:text-ctp-red"
        // onClick={() => onOrderChange(category.id, category.order + 1)}
      >
        [down]
      </button>
    </div>
  ) : (
    <h2 className="bg-ctp-text text-ctp-mantle px-1 mb-6 font-bold">
      {category.label}
    </h2>
  );
}

export default CategoryItem;

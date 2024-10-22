import { useContext } from 'react';
import EditCategoryForm from './EditCategoryForm.tsx';
import { Category } from '../types/category.ts';
import ActionButtons from './ActionButtons.tsx';
import http from '../http-commons.ts';
import { EditModeContext } from '../contexts.ts';

interface CategoryItemProps {
  category: Category;
}

function CategoryItem({ category }: CategoryItemProps) {
  const isEditMode = useContext(EditModeContext);

  function handleDelete() {
    http.delete(`/categories/${category.id}`).catch((error) => {
      console.error(error);
    });
  }

  function handleOrderChange(order: number) {
    http.put(`/categories/${category.id}`, { order: order }).catch((error) => {
      console.error(error);
    });
  }

  return isEditMode ? (
    <div className="flex gap-2">
      <EditCategoryForm category={category}></EditCategoryForm>
      <ActionButtons
        target={category}
        onDelete={() => handleDelete()}
        onOrderChange={(order) => handleOrderChange(order)}
      />
    </div>
  ) : (
    <h2 className="bg-ctp-text text-ctp-mantle px-1 mb-6 font-bold">
      {category.label}
    </h2>
  );
}

export default CategoryItem;

import { ChangeEvent } from 'react';
import http from '../http-commons.ts';
import { Category } from '../types/category.ts';

interface EditCategoryFormProps {
  category: Category;
}

function EditCategoryForm({ category }: EditCategoryFormProps) {
  function change(event: ChangeEvent<HTMLInputElement>) {
    category.label = event.target.value;

    http.put('/categories', category).catch((error) => {
      console.error(error);
    });
  }

  return (
    <div className="w-full flex mb-6">
      <input
        type="text"
        name="categoryLabel"
        className="flex-grow h-6 bg-ctp-text text-ctp-mantle px-1 font-bold
        border-2 border-ctp-text focus:outline-none
        focus:bg-ctp-mantle focus:text-ctp-text"
        defaultValue={category.label}
        onChange={(e) => change(e)}
      />
    </div>
  );
}

export default EditCategoryForm;

import { Category } from '../types/category.ts';
import LinkItem from './LinkItem.tsx';
import { useContext, useEffect, useState } from 'react';
import http from '../http-commons.ts';
import { Link } from '../types/link.ts';
import { EditModeContext } from '../contexts/EditModeContext.ts';
import EditCategoryForm from './EditCategoryForm.tsx';

interface CategoryProps {
  category: Category;
  // onOrderChange: (id: number, value: number) => void;
}

function CategoryBlock({ category }: CategoryProps) {
  const [links, setLinks] = useState<Link[]>([]);
  const isEditMode = useContext(EditModeContext);

  function getLinks() {
    http
      .get<Link[]>('/links/category/' + category.id)
      .then((resp) => {
        const data: Link[] = resp.data;
        setLinks(data);
      })
      .catch((err) => console.error(err));
  }

  function handleNewLink() {
    http
      .post<Link>('/links', {
        label: 'unnamed',
        url: 'http://localhost',
        categoryId: category.id,
      })
      .then((resp) => {
        const data: Link = resp.data;
        setLinks([...links, data]);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => getLinks(), []);

  if (!links) {
    return <div>Loading...</div>;
  }

  const label = isEditMode ? (
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

  return (
    <section className="mb-8 last:mb-2 first:mt-2">
      {label}
      <ul>
        {links.map((link) => (
          <li key={link.id} className="select-none">
            <LinkItem link={link} />
          </li>
        ))}
        {isEditMode && (
          <li>
            <button
              className="block hover:bg-ctp-surface0 w-full px-1 text-start text-ctp-green"
              onClick={() => handleNewLink()}
            >
              [new_site]
            </button>
          </li>
        )}
      </ul>
    </section>
  );
}

export default CategoryBlock;

import CategoryBlock from './components/CategoryBlock.tsx';
import { Category } from './types/category.ts';
import { useEffect, useState } from 'react';
import http from './http-commons.ts';
import { EditModeContext } from './contexts/EditModeContext.ts';

function App() {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [isEditMode, setEditMode] = useState(false);

  useEffect(() => {
    http
      .get<Category[]>('/categories')
      .then((response) => {
        const data: Category[] = response.data;
        data.sort((a, b) => a.order - b.order);
        setCategories(data);
      })
      .catch((error) => console.error(error));
  }, []);

  if (!categories) {
    return <div>Loading...</div>;
  }

  return (
    <EditModeContext.Provider value={isEditMode}>
      <header className="container mx-auto mb-4">
        <div className="flex justify-between px-8">
          <h1 className="font-bold text-center uppercase text-ctp-lavender">
            // {import.meta.env.VITE_APP_NAME}
          </h1>
          <div className="text-ctp-surface2 select-none flex gap-2">
            {isEditMode ? (
              <button className="h-6 text-ctp-green hover:text-ctp-text hover:cursor-pointer">
                [new_category]
              </button>
            ) : null}
            <button
              onClick={() => setEditMode(!isEditMode)}
              className={`h-6 ${isEditMode ? 'text-ctp-blue' : ''} hover:text-ctp-text hover:cursor-pointer`}
            >
              [{isEditMode ? 'back' : 'edit'}]
            </button>
          </div>
        </div>
      </header>
      <main className="container mx-auto bg-ctp-mantle p-2">
        <div
          className={
            (isEditMode ? 'border-ctp-red' : 'border-ctp-text') +
            ' border-2 p-2'
          }
        >
          {categories.map((category) => (
            <CategoryBlock key={category.id} category={category} />
          ))}
        </div>
      </main>
    </EditModeContext.Provider>
  );
}

export default App;

import CategoryBlock from './components/CategoryBlock.tsx';
import { Category } from './types/category.ts';
import { useEffect, useState } from 'react';
import http from './http-commons.ts';

function App() {
  const [categories, setCategories] = useState<Category[] | null>(null);

  useEffect(() => {
    http
      .get<Category[]>('/categories')
      .then((response) => {
        const data: Category[] = response.data;
        setCategories(data);
      })
      .catch((error) => console.error(error));
  }, []);

  if (!categories) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <header className="container mx-auto">
        <h1 className="font-bold text-center uppercase text-ctp-lavender">
          ◢ Home ◣
        </h1>
      </header>
      <main className="container mx-auto bg-ctp-mantle p-2">
        <div className="border-2 border-ctp-text p-2">
          {categories.map((category) => (
            <CategoryBlock key={category.id} category={category} />
          ))}
        </div>
      </main>
    </>
  );
}

export default App;

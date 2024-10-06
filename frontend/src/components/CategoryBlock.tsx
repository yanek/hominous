import { Category } from '../types/category.ts';
import LinkItem from './LinkItem.tsx';
import { useEffect, useState } from 'react';
import http from '../http-commons.ts';
import { Link } from '../types/link.ts';

interface CategoryProps {
  category: Category;
}

function CategoryBlock(props: CategoryProps) {
  const [links, setLinks] = useState<Link[] | null>(null);

  useEffect(() => {
    http
      .get<Link[]>('/links/category/' + props.category.id)
      .then((response) => {
        const data: Link[] = response.data;
        setLinks(data);
      })
      .catch((error) => console.error(error));
  }, []);

  if (!links) {
    return <div>Loading...</div>;
  }

  return (
    <section className="mb-8 last:mb-0">
      <h2 className="bg-ctp-text text-ctp-mantle px-1 mb-6 font-bold">
        {props.category.label}
      </h2>
      <ul>
        {links.map((link) => (
          <li key={link.id}>
            <LinkItem link={link} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CategoryBlock;

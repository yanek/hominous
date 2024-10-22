import LinkItem from './LinkItem.tsx';
import { useContext, useEffect, useState } from 'react';
import { Link } from '../types/link.ts';
import http from '../http-commons.ts';
import { EditModeContext } from '../contexts.ts';

interface LinkListProps {
  categoryId: number;
}

function LinkList({ categoryId }: LinkListProps) {
  const [links, setLinks] = useState<Link[]>([]);
  const isEditMode = useContext(EditModeContext);

  function handleNewLink() {
    http
      .post<Link>('/links', {
        label: 'unnamed',
        url: 'http://localhost',
        categoryId: categoryId,
      })
      .then((resp) => {
        const data: Link = resp.data;
        setLinks([...links, data]);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    http
      .get<Link[]>('/links/category/' + categoryId)
      .then((resp) => {
        const data: Link[] = resp.data;
        setLinks(data);
      })
      .catch((err) => console.error(err));
  }, [categoryId]);

  if (!links) {
    return <div>Loading...</div>;
  }

  return (
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
  );
}

export default LinkList;

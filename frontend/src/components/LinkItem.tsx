import { Link } from '../types/link.ts';
import EditLinkForm from './EditLinkForm.tsx';
import { useContext } from 'react';
import { EditModeContext } from '../contexts.ts';
import ActionButtons from './ActionButtons.tsx';
import http from '../http-commons.ts';

interface LinkItemProps {
  link: Link;
}

function LinkItem({ link }: LinkItemProps) {
  const isEditMode = useContext(EditModeContext);

  function handleDelete() {
    http.delete(`/links/${link.id}`).catch((error) => {
      console.error(error);
    });
  }

  function handleOrderChange(newOrder: number) {
    http.put(`/links/${link.id}`, { order: newOrder }).catch((error) => {
      console.error(error);
    });
  }

  return isEditMode ? (
    <div className="flex gap-2">
      <EditLinkForm link={link} onSubmit={(e) => console.log(e)} />
      <ActionButtons
        target={link}
        onDelete={() => handleDelete()}
        onOrderChange={(order) => handleOrderChange(order)}
      />
    </div>
  ) : (
    <a
      href={link.url}
      className="block hover:bg-ctp-surface0 w-full px-1 group lowercase"
      target="_blank"
      rel="noopener noreferrer"
    >
      ▶ {link.label}{' '}
      <span className="hidden md:group-hover:inline text-ctp-blue">
        [{link.url}]
      </span>
    </a>
  );
}

export default LinkItem;

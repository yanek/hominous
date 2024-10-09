import { Link } from '../types/link.ts';
import EditLinkForm from './EditLinkForm.tsx';
import { useContext } from 'react';
import { EditModeContext } from '../contexts/EditModeContext.ts';

interface LinkItemProps {
  link: Link;
}

function LinkItem({ link }: LinkItemProps) {
  const isEditMode = useContext(EditModeContext);

  return isEditMode ? (
    <EditLinkForm link={link} onSubmit={(e) => console.log(e)} />
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

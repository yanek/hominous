import { ChangeEvent } from 'react';
import http from '../http-commons.ts';
import { Link } from '../types/link.ts';

interface EditLinkFormProps {
  link: Link;
  onSubmit: (link: Link) => void;
}

function EditLinkForm({ link }: EditLinkFormProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    switch (event.target.name) {
      case 'linkLabel':
        link.label = event.target.value;
        break;
      case 'linkUrl':
        link.url = event.target.value;
        break;
    }

    if (link.id > 0) {
      http.put('/links', link).catch((error) => {
        console.error(error);
      });
    } else {
      // TODO: POST
    }
  }

  return (
    <div className="w-full flex">
      <input
        type="text"
        className="block bg-transparent hover:bg-ctp-surface0 focus:bg-ctp-surface0 focus:outline-none w-full px-1 group lowercase"
        name="linkLabel"
        defaultValue={link.label}
        onChange={(e) => handleChange(e)}
      />
      <input
        type="url"
        className="block bg-transparent hover:bg-ctp-surface0 focus:bg-ctp-surface0 focus:outline-none w-full px-1 group lowercase"
        name="linkUrl"
        defaultValue={link.url}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
}

export default EditLinkForm;

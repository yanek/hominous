import { Link } from '../types/link.ts';

interface LinkItemProps {
  link: Link;
}

function LinkItem(props: LinkItemProps) {
  return (
    <a
      href={props.link.url}
      className="block hover:bg-ctp-surface0 w-full px-1 group lowercase"
      target="_blank"
      rel="noopener noreferrer"
    >
      ▶ {props.link.label}{' '}
      <span className="invisible group-hover:visible text-ctp-green">
        [{props.link.url}]
      </span>
    </a>
  );
}

export default LinkItem;

import './accordionMenu.css';

import { useLayoutEffect, useState } from 'react';
import { useMatches } from 'react-router-dom';

type AccordionMenuProps = {
  readonly id: number;
  readonly title: string;
  readonly path?: string;
  readonly children: React.ReactNode;
};

export const AccordionMenu = ({
  id,
  title,
  path = '',
  children,
}: AccordionMenuProps): JSX.Element => {
  const [expanded, setExpanded] = useState<boolean>(false);
  // Only works with data routers.
  const matches = useMatches();

  // useLayoutEffect blocks the browser from repainting
  useLayoutEffect(() => {
    const isMatch = matches.some((match) => match.pathname === path);
    setExpanded(isMatch);
  }, [matches, path]);

  const toggleSection = () => {
    setExpanded((prev) => !prev);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleSection();
    }
  };

  return (
    <div className="accordion-menu">
      <div
        className={`accordion-section ${expanded ? 'expanded' : 'collapsed'}`}
        key={id}>
        <button
          aria-controls={`accordion-content-${id}`}
          aria-expanded={expanded}
          className="accordion-section-header"
          onClick={() => toggleSection()}
          onKeyDown={(e) => handleKeyPress(e)}
          type="button">
          <span className="accordion-section-title">{title}</span>
          <svg
            className="accordion-section-icon"
            fill="currentColor"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </button>
        {expanded ? (
          <div
            className="accordion-section-content"
            id={`accordion-content-${id}`}>
            {children}
          </div>
        ) : null}
      </div>
    </div>
  );
};

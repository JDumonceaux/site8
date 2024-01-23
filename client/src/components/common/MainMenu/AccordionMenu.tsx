import { useLayoutEffect, useState } from 'react';
import './accordionMenu.css';
import { useMatches } from 'react-router-dom';

type AccordionMenuProps = {
  id: number;
  title: string;
  path?: string;
  children: React.ReactNode;
};

export function AccordionMenu({
  id,
  title,
  path = '',
  children,
}: AccordionMenuProps) {
  const [expanded, setExpanded] = useState<boolean>(false);
  // Only works with data routers.
  const matches = useMatches();

  useLayoutEffect(() => {
    const isMatch = matches.some((match) => match.pathname === path);
    setExpanded(isMatch);
  }, []);

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
    <div className='accordion-menu'>
      <div
        key={id}
        className={`accordion-section ${expanded ? 'expanded' : 'collapsed'}`}
      >
        <button
          type='button'
          onClick={() => toggleSection()}
          onKeyDown={(e) => handleKeyPress(e)}
          aria-controls={`accordion-content-${id}`}
          aria-expanded={expanded}
          className='accordion-section-header'
        >
          <span className='accordion-section-title'>{title}</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 24 24'
            width='24'
            height='24'
            className='accordion-section-icon'
          >
            {/* {isSectionExpanded(id) ? ( */}
            <path d='M7 10l5 5 5-5z' />
            {/* // ) : (
            //   <path d='M7 10l5 5 5-5z' fill='none' />
            // )} */}
          </svg>
        </button>
        {expanded && (
          <div
            id={`accordion-content-${id}`}
            className='accordion-section-content'
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

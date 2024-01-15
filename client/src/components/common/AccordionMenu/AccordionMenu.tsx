import { useState } from "react";
import "./accordionMenu.css";

export interface AccordionMenuProps {
  id: number;
  title: string;
  children: React.ReactNode;
}

export function AccordionMenu({ id, title, children }: AccordionMenuProps) {
  const [expandedSections, setExpandedSections] = useState<number[]>([]);

  const toggleSection = (sectionId: number) => {
    setExpandedSections((prevExpanded) => {
      if (prevExpanded.includes(sectionId)) {
        return prevExpanded.filter((id) => id !== sectionId);
      } else {
        return [...prevExpanded, sectionId];
      }
    });
  };

  const isSectionExpanded = (sectionId: number) => {
    return expandedSections.includes(sectionId);
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    sectionId: number
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleSection(sectionId);
    }
  };

  return (
    <div className="accordion-menu">
      <div
        key={id}
        className={`accordion-section ${
          isSectionExpanded(id) ? "expanded" : "collapsed"
        }`}
      >
        <button
          type="button"
          onClick={() => toggleSection(id)}
          onKeyDown={(e) => handleKeyPress(e, id)}
          aria-controls={`accordion-content-${id}`}
          aria-expanded={isSectionExpanded(id)}
          className="accordion-section-header"
        >
          <span className="accordion-section-title">{title}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="accordion-section-icon"
          >
            {isSectionExpanded(id) ? (
              <path d="M7 10l5 5 5-5z" />
            ) : (
              <path d="M7 10l5 5 5-5z" fill="none" />
            )}
          </svg>
        </button>
        {isSectionExpanded(id) && (
          <div
            id={`accordion-content-${id}`}
            className="accordion-section-content"
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

import { TextLabel } from '../TextLabel';
import './textArea.css';

import { TextareaHTMLAttributes } from 'react';

type TextAreaProps = {
  id: string;
  label: string;
  showCounter?: boolean;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id' | 'name' | 'type'>;

export function TextArea({
  id,
  label,
  showCounter = false,
  ...rest
}: TextAreaProps): JSX.Element {
  return (
    <div className="text-area">
      <TextLabel htmlFor={id}>{label}</TextLabel>
      <textarea
        id={id}
        name={id}
        {...rest}
      />
      <div className="help">
        <div>
          <ul>
            <li>Required</li>
          </ul>
        </div>
        {showCounter ? <div>0/30</div> : null}
      </div>
    </div>
  );
}

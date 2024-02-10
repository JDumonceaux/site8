import './textInput.css';

import { InputHTMLAttributes } from 'react';

type TextInputProps = {
  id: string;
  label: string;
  showCounter?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'name' | 'type'>;

export function TextInput({
  id,
  label,
  showCounter = false,
  ...rest
}: TextInputProps): JSX.Element {
  return (
    <div className="text-input">
      <label
        className="label"
        htmlFor={id}>
        {label}
      </label>
      <input
        className="input"
        type="text"
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

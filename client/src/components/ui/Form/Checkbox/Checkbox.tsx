import './checkbox.css';

import { InputHTMLAttributes } from 'react';

type CheckboxProps = {
  id: string;
  label: string;
  showCounter?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'name' | 'type'>;

export function Checkbox({
  id,
  label,
  showCounter = false,
  ...rest
}: CheckboxProps): JSX.Element {
  return (
    <div className="checkbox">
      <label
        className="label"
        htmlFor={id}>
        {label}
      </label>
      <input
        className="input"
        type="checkbox"
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

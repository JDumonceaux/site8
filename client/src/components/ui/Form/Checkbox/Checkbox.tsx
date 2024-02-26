import './checkbox.css';

import { InputHTMLAttributes } from 'react';

type CheckboxProps = {
  readonly id: string;
  readonly label: string;
  readonly showCounter?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'name' | 'type'>;

export const Checkbox = ({
  id,
  label,
  showCounter = false,
  ...rest
}: CheckboxProps): JSX.Element => {
  return (
    <div className="checkbox">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <input className="input" id={id} name={id} type="checkbox" {...rest} />
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
};

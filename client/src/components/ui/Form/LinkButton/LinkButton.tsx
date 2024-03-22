import { ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { Button2 } from '../Button2';

type LinkButtonProps = {
  readonly id: string;
  readonly children: React.ReactNode;
  readonly variant?: 'primary' | 'secondary';
  readonly to: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'id' | 'name'>;

export const LinkButton = ({ to, ...rest }: LinkButtonProps): JSX.Element => (
  <Link to={to}>
    <Button2 {...rest} />
  </Link>
);

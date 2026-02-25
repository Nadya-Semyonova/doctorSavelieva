export interface IButtonDefault {
  name?: string;
  handleClick?: () => void;
  styleButton?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'outline' | 'continue';
  ariaLabel?: string;
  children?: React.ReactNode;
  status?: boolean;
}
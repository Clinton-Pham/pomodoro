import { Button } from "evergreen-ui";
interface IButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  icon?: string;
}

export const ButtonComponent: React.FC<IButtonProps> = ({
  onClick,
  disabled,
  children,
  icon,
}: IButtonProps) => {
  return (
    <div>
      <Button onClick={onClick} disabled={disabled}>
        {children}
      </Button>
    </div>
  );
};

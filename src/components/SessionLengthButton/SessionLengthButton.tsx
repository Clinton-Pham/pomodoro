import React from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Button,
  Heading,
  Pane,
} from "evergreen-ui";

interface SessionLengthButtonProps {
  sessionLength: number;
  onChange: (newTime: number) => void;
  disabled?: boolean;
  title: string;
}

export const SessionLengthButton: React.FC<SessionLengthButtonProps> = ({
  sessionLength,
  onChange,
  disabled = false,
  title,
}: SessionLengthButtonProps) => {
  const handleIncrementCounter = () => {
    onChange(sessionLength + 1);
  };

  const handleDecrementCounter = () => {
    onChange(sessionLength > 1 ? sessionLength - 1 : 1);
  };
  return (
    <Pane display="flex" alignItems="center" justifyContent="center">
      <Heading size={800} marginLeft={50} marginRight={10}>
        {title}
      </Heading>
      <Button
        marginRight={16}
        onClick={handleIncrementCounter}
        disabled={disabled}
      >
        <ArrowUpIcon />
      </Button>
      <h5>{sessionLength}</h5>
      <Button
        marginLeft={16}
        onClick={handleDecrementCounter}
        disabled={disabled}
      >
        <ArrowDownIcon />
      </Button>
    </Pane>
  );
};

import { Button } from 'evergreen-ui'
import React from 'react'
interface IButtonProps {
  onClick: () => void
  disabled?: boolean
  children: React.ReactNode
  icon?: string
}

export const ButtonComponent: React.FC<IButtonProps> = ({
  onClick,
  disabled,
  children
}: IButtonProps) => {
  return (
    <div>
      <Button onClick={onClick} disabled={disabled}>
        {children}
      </Button>
    </div>
  )
}

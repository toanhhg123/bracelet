import React from 'react'

import type { ButtonProps } from '@/shared/Button/Button'
import Button from '@/shared/Button/Button'

export interface ButtonSecondaryProps extends ButtonProps {
  href?: any
}

const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({
  className = '',
  ...args
}) => {
  return <Button className={`${className}`} type='button' {...args} />
}

export default ButtonSecondary

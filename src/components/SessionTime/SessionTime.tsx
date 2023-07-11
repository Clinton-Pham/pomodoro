import React from 'react';
import { Heading } from 'evergreen-ui'

interface ISessionTimeProps {
  time: string
  title: string
}
export const SessionTime: React.FC<ISessionTimeProps> = ({ time, title }: ISessionTimeProps) => {
  return (
    <Heading size={800} marginBottom={10} marginTop={50}>
      {title}
      <br />
      {time}
    </Heading>
  )
}

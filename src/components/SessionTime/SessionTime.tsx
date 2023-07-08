import React from "react";
import { Heading } from "evergreen-ui";

interface SessionTime {
  time: string;
  title: string;
}
export const SessionTime = ({ time, title }: SessionTime) => {
  return (
    <Heading size={800} marginBottom={10} marginTop={50}>
      {title}
      <br />
      {time}
    </Heading>
  );
};

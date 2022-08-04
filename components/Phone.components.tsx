import React from "react";
import styled from "styled-components";

interface IProps {
  children: React.ReactNode;
}

export const Phone = ({ children }: IProps) => {
  return <PhoneWrapper>{children}</PhoneWrapper>;
};

const PhoneWrapper = styled.section`
  background-color: #f7f3e5;
  max-width: 750px;
`;

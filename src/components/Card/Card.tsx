import React from "react";
import styled from "styled-components";

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export const Card = ({ children, ...rest }: CardProps) => {
  return <StyledCard {...rest}>{children}</StyledCard>;
};

const CardContent = ({ children, ...rest }: { children: React.ReactNode }) => {
  return <StyledCardContent {...rest}>{children}</StyledCardContent>;
};

const CardAction = ({ children, ...rest }: { children: React.ReactNode }) => {
  return <StyledCardAction {...rest}>{children}</StyledCardAction>;
};

Card.Content = CardContent;
Card.Action = CardAction;

const StyledCard = styled("div")`
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.1);
  outline: 1px solid transparent;
  transition: outline 0.2s;

  &:hover {
    cursor: pointer;
    outline: 1px solid #06cbf7;
  }

  @media screen and (min-width: 1025px) {
    min-width: 992px;
  }

  @media screen and (min-width: 375px) {
    min-width: 343px;
  }
`;

const StyledCardContent = styled("div")``;
const StyledCardAction = styled("div")``;

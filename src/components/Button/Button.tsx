import React from "react";
import styled from "styled-components";

export interface Props {
  /**
   *  테스트 버튼 입니다!!
   */
  label: string;
  /**
   * background color
   */
  backgroundColor?: string;
  /**
   * Optional click handler
   */
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ label, ...rest }: Props) => {
  return <StyledButton {...rest}>{label}</StyledButton>;
};

export default Button;

const StyledButton = styled.button<{ backgroundColor?: string }>`
  width: 177px;
  height: 30px;
  border-radius: 6px;
  background: ${({ backgroundColor, theme }) =>
    backgroundColor || theme.colors.primary};
  color: #fff;
`;

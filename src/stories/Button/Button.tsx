import React from "react";

interface Props {
  /**
   *  테스트 버튼 입니다!!
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

const Button = ({ label, ...props }: Props) => {
  return <button {...props}>{label}</button>;
};

export default Button;

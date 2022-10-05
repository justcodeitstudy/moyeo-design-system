import React, { HTMLAttributes } from "react";
import styled from "styled-components";

export type ModalContentProps = HTMLAttributes<HTMLDivElement>;
const StyledModalContent = styled.div`
  background-color: #fff;

  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.general["300"]};

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
const ModalContent = ({ children, ...props }: ModalContentProps) => {
  return (
    <StyledModalContent
      role="document"
      tabIndex={-1}
      {...props}
      onClick={(event) => {
        props.onClick?.(event);
        event.stopPropagation();
      }}
    >
      {children}
    </StyledModalContent>
  );
};

export default ModalContent;

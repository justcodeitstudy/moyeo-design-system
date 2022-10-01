import React, { ChangeEventHandler, InputHTMLAttributes } from "react";
import styled from "styled-components";
import { CheckboxIcon } from "../../Icon/svg";

type Size = "medium" | "large" | "small";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  boxsize: Size;
  checked?: boolean;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement> & (() => void);
}

const getCheckboxSize = (boxSize: Size) => {
  const checkbox = {
    medium: { width: 24, height: 24 },
    large: { width: 28, height: 28 },
    small: { width: 20, height: 20 },
  };

  const icon = {
    medium: { width: 18, height: 14 },
    large: { width: 20, height: 16 },
    small: { width: 14, height: 12 },
  };

  return {
    checkbox: checkbox[boxSize],
    icon: icon[boxSize],
  };
};

const Checkbox = ({ boxsize, checked, disabled, ...rest }: CheckboxProps) => {
  const props = { boxsize, checked, disabled };

  return (
    <StyledLabel htmlFor={rest.id}>
      <StyledCheckbox type="checkbox" {...props} {...rest} />
      <StyledCheckboxIcon {...props} />
    </StyledLabel>
  );
};

export default Checkbox;

const StyledLabel = styled.label`
  position: relative;

  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const StyledCheckbox = styled.input<CheckboxProps>`
  ${({ boxsize }) => getCheckboxSize(boxsize).checkbox};

  border: 2px solid #afafaf;
  border-radius: 4px;

  appearance: none;

  &:checked {
    background: ${({ theme }) => theme.colors.primary};
    border: none;
  }

  &:disabled {
    border-color: #d9d9d9;
  }

  &:checked:disabled {
    background: #d9d9d9;
  }
`;

const StyledCheckboxIcon = styled(CheckboxIcon)<CheckboxProps>`
  position: absolute;

  ${({ boxsize }) => getCheckboxSize(boxsize).icon};

  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  & path {
    stroke: ${(props) =>
      (!props.checked && props.disabled && "#fff") ||
      (props.disabled && "#888")};
  }
`;

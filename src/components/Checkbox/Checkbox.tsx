import React, {
  ChangeEventHandler,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import styled from "styled-components";
import { CheckboxIcon } from "../../Icon/svg";
import { getCheckboxSize, getLabelSize } from "./style";

type Size = "medium" | "large" | "small";
type Ref = HTMLInputElement;

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  boxsize?: Size;
  name?: string;
  label?: ReactNode;
  checked?: boolean;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Checkbox = forwardRef<Ref, CheckboxProps>(
  (
    { label, boxsize = "medium", checked, disabled, name, ...rest },
    inputRef,
  ) => {
    const props = { boxsize, checked, disabled };

    return (
      <StyledLabel htmlFor={name}>
        <StyledInputWrap>
          <StyledCheckbox
            type="checkbox"
            name={name}
            ref={inputRef}
            aria-checked={checked}
            {...props}
            {...rest}
          />
          {checked && <StyledCheckboxIcon aria-hidden {...props} />}
        </StyledInputWrap>
        {label && <Label {...props}>{label}</Label>}
      </StyledLabel>
    );
  },
);

export default Checkbox;

const StyledLabel = styled.label`
  display: inline-flex;
  align-items: center;
`;

const StyledInputWrap = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const StyledCheckbox = styled.input<CheckboxProps>`
  ${({ boxsize }) => getCheckboxSize(boxsize || "medium").checkbox};

  border: 2px solid #afafaf;
  border-radius: 4px;

  appearance: none;

  cursor: pointer;

  &:checked {
    background: ${({ theme }) => theme.colors.primary};
    border: none;
  }

  &:disabled {
    border-color: #d9d9d9;
    cursor: not-allowed;
  }

  &:checked:disabled {
    background: #d9d9d9;
  }
`;

const StyledCheckboxIcon = styled(CheckboxIcon)<CheckboxProps>`
  position: absolute;
  pointer-events: none;

  ${({ boxsize }) => getCheckboxSize(boxsize || "medium").icon};

  & path {
    stroke: ${(props) =>
      (!props.checked && props.disabled && "#fff") ||
      (props.disabled && "#888")};
  }
`;

const Label = styled.span<CheckboxProps>`
  ${({ boxsize }) => getLabelSize(boxsize || "medium")};

  color: #4d4d4d;
`;

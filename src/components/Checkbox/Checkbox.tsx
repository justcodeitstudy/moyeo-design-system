import React, {
  ChangeEventHandler,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import styled from "styled-components";
import { CheckboxIcon } from "Icon/svg";
import { getCheckboxSize, getLabelSize } from "./style";

export type Size = "medium" | "large" | "small";
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

  border: ${({ theme }) => `2px solid ${theme.colors.general["500"]}`};
  border-radius: 4px;

  appearance: none;

  cursor: pointer;

  &:checked {
    background: ${({ theme }) => theme.colors.primary["500"]};
    border: none;
  }

  &:disabled {
    border-color: ${({ theme }) => theme.colors.text.disabled};
    cursor: not-allowed;
  }

  &:checked:disabled {
    background: ${({ theme }) => theme.colors.text.disabled};
  }
`;

const StyledCheckboxIcon = styled(CheckboxIcon)<CheckboxProps>`
  position: absolute;
  pointer-events: none;

  ${({ boxsize }) => getCheckboxSize(boxsize || "medium").icon};

  & path {
    stroke: ${({ theme, checked, disabled }) =>
      (!checked && disabled && "#fff") ||
      (disabled && theme.colors.text.disabled)};
  }
`;

const Label = styled.span<CheckboxProps>`
  ${({ boxsize }) => getLabelSize(boxsize || "medium")};

  margin-left: 12px;
  color: ${({ theme }) => theme.colors.black["400"]};
`;

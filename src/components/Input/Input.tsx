import React, { forwardRef, InputHTMLAttributes } from "react";
import styled from "styled-components";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  message?: React.ReactNode;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { message, value = "", name, label, disabled = false, onChange, ...rest },
    ref,
  ) => {
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value === "") {
        return;
      }
      onChange?.(e);
    };

    return (
      <>
        {label && <StyledLabelText htmlFor={name}>{label}</StyledLabelText>}
        <StyledInputContainer>
          <StyledInput
            ref={ref}
            aria-label={name}
            name={name}
            value={value}
            disabled={disabled}
            onChange={handleInput}
            {...rest}
          />
        </StyledInputContainer>
        {message && <StyledDescriptionText>{message}</StyledDescriptionText>}
      </>
    );
  },
);

const StyledInputContainer = styled("div")`
  display: flex;
  overflow: hidden;
  width: 100%;
`;

const StyledInput = styled("input")`
  outline: none;
  width: 100%;
  border: 1px solid #9e9e9e;
  padding: 12px 16px;
  border-radius: 6px;
  transition: border 0.2s ease-in-out;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  ::placeholder {
    color: #bfbfbf;
  }

  ${({ disabled }) =>
    disabled
      ? `
    background-color: ##F7F7F7;  
    `
      : `
    &:active, &:focus {
      border 1px solid #05B7DE;
    }
  
    &:hover {
      border: 1px solid #9beafc;
    }
  `}
`;

const StyledDescriptionText = styled("caption")`
  display: flex;
  align-items: center;
  margin: 6px 0 0 2px;
  font-size: 12px;
  line-height: 20px;
  color: #999999;
`;

const StyledLabelText = styled("label")`
  display: flex;
  align-items: center;
  margin: 0 0 6px 2px;
  color: #4d4d4d;
  font-size: 14px;
  line-height: 22px;
`;

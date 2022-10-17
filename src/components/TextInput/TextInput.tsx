import React, { forwardRef, InputHTMLAttributes } from "react";
import styled from "styled-components";
import { inputStyle, descriptionStyle } from "./style";

type InputStatus = "default" | "danger" | "warning";

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  message?: React.ReactNode;
  status?: InputStatus;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      message,
      value = "",
      name,
      label,
      status = "default",
      disabled = false,
      width = "300px",
      onChange,
      ...rest
    },
    ref,
  ) => {
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
    };

    return (
      <Container {...rest}>
        {label && <StyledLabelText htmlFor={name}>{label}</StyledLabelText>}
        <StyledTextInputContainer>
          <StyledTextInput
            ref={ref}
            aria-label={name}
            name={name}
            value={value}
            disabled={disabled}
            width={width}
            status={status}
            onChange={handleInput}
          />
        </StyledTextInputContainer>
        {message && (
          <StyledDescriptionText status={status}>
            {message}
          </StyledDescriptionText>
        )}
      </Container>
    );
  },
);

const Container = styled("div")``;

const StyledTextInputContainer = styled("div")`
  display: flex;
  overflow: hidden;
`;

const StyledTextInput = styled("input")<TextInputProps>`
  outline: none;
  width: ${({ width }) => width};
  padding: 12px 16px;
  border-radius: 6px;
  transition: border 0.2s ease-in-out;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  ::placeholder {
    color: ${({ theme }) => theme.colors.black[200]};
  }

  ${({ theme, disabled }) =>
    disabled
      ? `
    background-color: ${theme.colors.general[100]};  
    `
      : `
    &:active, &:focus {
      border 1px solid ${theme.colors.primary[600]};
    }
  
    &:hover {
      border: 1px solid ${theme.colors.primary[300]};
    }
  `}

  ${({ status }) => status && inputStyle[status]}
`;

const StyledDescriptionText = styled("span")<Pick<TextInputProps, "status">>`
  display: flex;
  align-items: center;
  margin: 6px 0 0 2px;
  ${({ theme }) => theme.typography.xs};
  color: ${({ theme }) => theme.colors.black[300]};
  ${({ status }) => status && descriptionStyle[status]}
`;

const StyledLabelText = styled("label")`
  display: flex;
  align-items: center;
  margin: 0 0 6px 2px;
  color: ${({ theme }) => theme.colors.black[400]};
  ${({ theme }) => theme.typography.header4};
`;

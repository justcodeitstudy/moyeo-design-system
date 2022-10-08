import styled, { css } from "styled-components";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Option, OptionProps } from "./Option";
import { TextInput, TextInputProps } from "../TextInput";
import { Popover } from "../Popover";
import { isSameComponent, useResizeEffect } from "../../utils";

export interface SelectProps {
  value: string;
  label?: string;
  onSelect?: (value: string) => void;
  onChange?: (value: string) => void;
  onClose?: () => void;
  children: React.ReactNode;
  inputProps?: TextInputProps;
  disabled?: boolean;
  placeholder?: string;
}

export const Select = ({
  children,
  label,
  value,
  onSelect,
  onChange,
  onClose,
  inputProps,
  disabled = false,
  placeholder,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [optionListWidth, setOptionListWidth] = useState(0);
  const [currentOption, setCurrentOption] = useState({ value: "", label: "" });

  const reduceOptions = useCallback(
    (
      acc: React.FunctionComponentElement<OptionProps>[],
      cur: React.ReactNode | React.ReactFragment | React.ReactPortal,
    ): React.FunctionComponentElement<OptionProps>[] => {
      if (isSameComponent(cur, Option)) {
        return [...acc, cur];
      }

      return acc;
    },
    [],
  );

  const toSelectOption = (option: React.ReactElement<OptionProps>) => {
    return React.cloneElement(option, {
      ...option.props,
      selected: value === option.props.value,
      onClick: (e: React.MouseEvent<Element>) => {
        onChange?.(option.props.value);
        onSelect?.(option.props.value);
        option.props.onClick?.(e);
        closeOptionDrawer();
      },
    });
  };

  const openOptionDrawer = () => {
    setIsOpen(true);
    setOptionListWidth(selectRef.current?.clientWidth || 0);
  };

  const closeOptionDrawer = () => {
    setIsOpen(false);
    onClose?.();
  };

  const optionType = useMemo(
    () =>
      React.Children.map(
        React.Children.toArray(children).reduce<
          React.FunctionComponentElement<OptionProps>[]
        >(reduceOptions, []),
        ({ props }) => {
          return {
            label: props.children,
            value: props.value,
          };
        },
      ),
    [children, reduceOptions],
  );

  useEffect(() => {
    setCurrentOption(() => {
      const findValue = optionType.find(
        ({ value: optionValue }) => optionValue === value,
      );

      if (!findValue) {
        return {
          value: "",
          label: "",
        };
      }

      return {
        value: findValue.value,
        label: findValue?.label as string,
      };
    });
  }, [value, optionType]);

  useResizeEffect(() =>
    setOptionListWidth(selectRef.current?.clientWidth || 0),
  );

  const select = (
    <StyledInputContainer
      ref={selectRef}
      role="select"
      active={isOpen}
      disabled={disabled}
      onClick={openOptionDrawer}
      placeholder={placeholder}
      hasValue={!!value}
    >
      <TextInputOverride
        ref={inputRef}
        value={currentOption?.label ?? value}
        readOnly
        disabled={disabled}
        {...inputProps}
      />
      <IconContainer>↓</IconContainer>
    </StyledInputContainer>
  );

  const optionDrawer = (
    <OptionList optionListWidth={optionListWidth} role="listbox">
      {React.Children.toArray(children).map((child) => {
        return isSameComponent(child, Option) ? toSelectOption(child) : child;
      })}
    </OptionList>
  );

  return (
    <>
      {label && <StyledLabelText>{label}</StyledLabelText>}
      <Popover
        isOpen={isOpen}
        anchorPosition={{
          x: 0,
          y: 5,
        }}
        onClose={closeOptionDrawer}
        opener={select}
      >
        {optionDrawer}
      </Popover>
    </>
  );
};

const StyledLabelText = styled("label")`
  ${({ theme }) => theme.typography.header4};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const StyledInputContainer = styled("div")<{
  active: boolean;
  disabled: boolean;
  hasValue: boolean;
}>`
  display: flex;
  align-items: center;
  position: relative;
  min-height: 22px;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.general[300]};
  border-radius: 4px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.general.white};
  transition: border-color 0.2s ease-in-out;

  ${({ theme, disabled }) =>
    disabled &&
    `
    background-color: ${theme.colors.general[100]};
    pointer-events: none;
    `}

  ${({ theme, active }) =>
    active &&
    css`
      border: 1px solid ${theme.colors.primary[600]};
    `}

  ${({ hasValue, placeholder }) =>
    !hasValue &&
    placeholder &&
    css`
      &:before {
        content: attr(placeholder);
        white-space: nowrap;
        width: 100%;
        color: ${({ theme }) => theme.colors.text.secondary};
      }
    `};

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.primary[300]};
  }
`;

const IconContainer = styled("div")`
  cursor: pointer;
  display: inline-flex;
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  transform-origin: 50%;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const TextInputOverride = styled(TextInput)`
  ${({ theme }) => theme.typography.header4};
  border: none;
  padding: 0px;

  &:hover,
  &:focus,
  &:active {
    border: none;
    outline: none;
  }

  ${({ theme, disabled }) =>
    disabled &&
    `
    background-color: ${theme.colors.general[100]};
    color: ${theme.colors.text.secondary};
    pointer-events: none;
  `}
`;

const OptionList = styled("li")<{
  optionListWidth: number;
}>`
  width: ${({ optionListWidth }) => optionListWidth}px;
  padding: 8px 0;
  overflow-y: auto;
  list-style-type: none;
`;

Select.Option = Option;

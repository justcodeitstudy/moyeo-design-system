import styled, { css } from "styled-components";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Option, OptionProps } from "./Option";
import { TextInput, TextInputProps } from "components/TextInput";
import { Popover } from "components/Popover";
import { isSameComponent, useResizeEffect } from "utils";

export interface SelectProps<Multiple extends boolean = false> {
  value: Multiple extends true ? string[] : string;
  isMulti?: Multiple;
  label?: string;
  disabled?: boolean;
  children: React.ReactNode;
  inputProps?: TextInputProps;
  placeholder?: string;
  renderInput?: (value: string[]) => React.ReactNode;
  onSelect?: (value: string) => void;
  onChange?: (value: Multiple extends true ? string[] : string) => void;
  onClose?: () => void;
  onSearchInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Select = <Multiple extends boolean = false>({
  children,
  label,
  isMulti,
  renderInput,
  value,
  onSelect,
  onChange,
  onClose,
  onSearchInputChange,
  inputProps,
  disabled = false,
  placeholder,
}: SelectProps<Multiple>) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [optionListWidth, setOptionListWidth] = useState(0);
  const [currentOption, setCurrentOption] = useState({ value: "", label: "" });
  const [searchKeyword, setSearchKeyword] = useState("");

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

  const isSelected = useCallback(
    (currentValue: string) => {
      if (isMulti) {
        return value.includes(currentValue);
      }
      return value === currentValue;
    },
    [isMulti, value],
  );

  const updateValue = (selectedValue: string) => {
    let changedValue: string[] | string = selectedValue;

    if (!changedValue) {
      throw new Error("selectedValue is undefined");
    }

    if (isMulti && Array.isArray(value)) {
      changedValue = value.includes(selectedValue)
        ? value.filter((x) => x !== selectedValue)
        : [...value.slice(), selectedValue];
    }

    onChange?.(changedValue as Multiple extends true ? string[] : string);
  };

  const toSelectOption = (option: React.ReactElement<OptionProps>) => {
    return React.cloneElement(option, {
      ...option.props,
      selected: isSelected(option.props.value),
      onClick: (e: React.MouseEvent<Element>) => {
        updateValue(option.props.value);
        onSelect?.(option.props.value);

        if (!isMulti) {
          closeOptionDrawer();
        }

        option.props.onClick?.(e);
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

  useEffect(() => {
    if (searchKeyword.trim() === "") {
      return closeOptionDrawer();
    }

    openOptionDrawer();
  }, [searchKeyword]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchInputChange?.(e);
    setSearchKeyword(e.target.value);
  };

  const inputContent =
    isMulti && Array.isArray(value) ? (
      <TextInputOverride
        value={searchKeyword}
        onChange={handleSearchInputChange}
        disabled={disabled}
        autoFocus
      />
    ) : (
      <TextInputOverride
        ref={inputRef}
        value={currentOption?.label ?? value}
        disabled={disabled}
        readOnly
        {...inputProps}
      />
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
      {inputContent}
      {/* TODO: icon 컴포넌트로 수정 */}
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
      {renderInput && Array.isArray(value) && renderInput(value)}
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

import React, {
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { SearchIcon } from "../../Icon/svg";

export interface SearchInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onSearch?: (value: string) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      placeholder = "",
      width = "400px",
      autoFocus,
      value,
      onSearch,
      onChange,
      ...rest
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState(value ?? "");

    useEffect(() => {
      if (value) {
        setInputValue(value);
      }
    }, [value]);

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onSearch?.(inputValue);
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      onChange?.(e);
    };

    return (
      <StyledSearchInputContainer width={width}>
        <StyledInput
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          autoFocus={autoFocus}
          placeholder={placeholder}
          onKeyUp={handleKeyUp}
        />
        <StyledSearchIcon>
          <SearchIcon />
        </StyledSearchIcon>
      </StyledSearchInputContainer>
    );
  },
);

const StyledSearchInputContainer = styled("div")<SearchInputProps>`
  display: flex;
  align-items: center;
  width: ${({ width }) => width};
  border: none;
  border-radius: 8px;
  position: relative;
  padding: 12px;
  background-color: ${({ theme }) => theme.colors.general[100]};
`;

const StyledInput = styled("input")`
  ${({ theme }) => theme.typography.header4};
  width: 100%;
  height: 22px;
  color: ${({ theme }) => theme.colors.black[400]};
  outline: none;
  border: none;
  background-color: ${({ theme }) => theme.colors.general[100]};

  &:focus + *:nth-child(2),
  &:not([value=""]) + *:nth-child(2) {
    display: none;
  }

  &:focus::placeholder {
    color: transparent;
  }

  &::placeholder {
    ${({ theme }) => theme.typography.md};
    padding-left: 25px;
    color: ${({ theme }) => theme.colors.text.third};
  }
`;

const StyledSearchIcon = styled("span")`
  display: flex;
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
`;

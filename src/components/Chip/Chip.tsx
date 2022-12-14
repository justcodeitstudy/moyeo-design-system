import { Icon } from "../Icon";
import React, { HTMLAttributes, ReactNode } from "react";
import styled, { css } from "styled-components";
import {
  getBackgroundColor,
  getBorderColor,
  getCancelIconColor,
  getColor,
} from "./style";

export type Color = "basic" | "active" | "danger" | "warning";
type Variants = "pill" | "rounded";

export interface ChipProps extends HTMLAttributes<HTMLDivElement> {
  color: Color;
  adornments?: ReactNode;
  label?: string;
  variants?: Variants;
  outlined?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onDelete?: (e: React.MouseEvent<HTMLDivElement>, label?: string) => void;
  deleteIcon?: React.ReactNode;
}

const Chip = ({
  adornments = "#",
  label = "Chip",
  color = "basic",
  variants,
  outlined,
  disabled,
  onClick,
  onDelete,
  deleteIcon = <Icon name="cancel" size={14} />,
  ...rest
}: ChipProps) => {
  const props = { color, variants, outlined, disabled };

  const handleChipClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClick?.(e);
  };

  const handleDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onDelete?.(e, label);
  };

  return (
    <StyledChip {...props} {...rest} onClick={handleChipClick}>
      {adornments && <StyledChipAdornments>{adornments}</StyledChipAdornments>}
      <StyledChipLabel {...props}>{label}</StyledChipLabel>
      {onDelete && (
        <StyledCancelIconContainer onClick={handleDelete} {...props}>
          {deleteIcon}
        </StyledCancelIconContainer>
      )}
    </StyledChip>
  );
};

export default Chip;

const StyledChip = styled.div<ChipProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  height: 26px;

  padding: 0 10px;

  ${({ theme }) => theme.typography.md};

  border-radius: ${({ variants }) =>
    variants === "pill" ? `${26 / 2}px` : "6px"};

  ${({ color, outlined, disabled, theme }) => {
    return disabled
      ? css`
          border: 1px solid ${theme.colors.general["200"]};
          color: ${theme.colors.text["disabled"]};
          background: #ffffff;
        `
      : css`
          border: 1px solid ${getBorderColor(color, outlined)};
          color: ${getColor(color, outlined)};
          background: ${getBackgroundColor(color, outlined)};
        `;
  }}
  gap: 2px;
`;

const StyledChipLabel = styled.span<ChipProps>`
  ${({ theme }) => theme.typography.sm};

  color: ${({ color, outlined, disabled, theme }) =>
    disabled ? theme.colors.text["disabled"] : getColor(color, outlined)};
`;

const StyledChipAdornments = styled.span`
  height: 100%;
  display: flex;
  align-items: center;
`;

const StyledCancelIconContainer = styled.div<ChipProps>`
  border: none;
  padding: 0;
  background: none;
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    color: ${({ color, outlined, disabled, theme }) =>
      disabled
        ? theme.colors.text["disabled"]
        : getCancelIconColor(color, outlined)};
  }
`;

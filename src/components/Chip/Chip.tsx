import React, { ReactNode } from "react";
import styled from "styled-components";
import {
  getBackgroundColor,
  getBorderColor,
  getCancelIconColor,
  getColor,
} from "./style";
import { Icon } from "components/Icon";

export type Color = "basic" | "active" | "danger" | "warning";
type Variants = "pill" | "rounded";
export interface ChipProps {
  color: Color;
  adornments?: ReactNode;
  label?: string;
  variants?: Variants;
  outlined?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onDelete?: (e: React.MouseEvent<HTMLDivElement>, label?: string) => void;
}

const Chip = ({
  adornments = "#",
  label = "Chip",
  color = "basic",
  variants,
  outlined,
  onClick,
  onDelete,
}: ChipProps) => {
  const props = { color, variants, outlined };

  const handleChipClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClick?.(e);
  };

  const handleDelete = (
    e: React.MouseEvent<HTMLDivElement> & React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();
    onDelete?.(e, label);
  };

  return (
    <StyledChip {...props} onClick={handleChipClick}>
      {adornments && <StyledChipAdornments>{adornments}</StyledChipAdornments>}
      <StyledChipLabel {...props}>{label}</StyledChipLabel>
      {onDelete && (
        <StyledCancelIconContainer onClick={handleDelete}>
          <StyledCancelIcon name="cancel" size={12} {...props} />
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

  border: ${({ color, outlined }) =>
    `1px solid ${getBorderColor(color, outlined)}`};

  color: ${({ color, outlined }) => getColor(color, outlined)};

  background: ${({ color, outlined }) => getBackgroundColor(color, outlined)};

  gap: 2px;
`;

const StyledChipLabel = styled.span<ChipProps>`
  ${({ theme }) => theme.typography.sm};

  color: ${({ color, outlined }) => getColor(color, outlined)};
`;

const StyledChipAdornments = styled.span`
  height: 100%;
  display: flex;
  align-items: center;
`;

const StyledCancelIconContainer = styled.div`
  border: none;
  padding: 0;
  background: none;
  display: flex;
  align-items: center;
`;

const StyledCancelIcon = styled(Icon)<ChipProps>`
  color: ${({ color, outlined }) => getCancelIconColor(color, outlined)};
`;

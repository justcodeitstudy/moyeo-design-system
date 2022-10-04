import React, { ReactNode } from "react";
import styled from "styled-components";
import { getBackgroundColor, getBorderColor, getColor } from "./style";

export type Color = "basic" | "active" | "danger" | "warning";
type Variants = "pill" | "rounded";

export interface ChipProps {
  color: Color;
  adornments?: ReactNode;
  label?: string;
  variants?: Variants;
  outlined?: boolean;
  onDelete?: (label: string) => void;
}

const Chip = ({
  adornments = "#",
  label = "Chip",
  color = "basic",
  variants,
  outlined,
  onDelete,
}: ChipProps) => {
  const props = { color, variants, outlined };

  return (
    <StyledChip {...props}>
      {adornments}
      <StyledChipLabel {...props}>{label}</StyledChipLabel>
      {onDelete && (
        //  TODO: 아이콘 추가
        <StyledCancelIcon onClick={() => onDelete(label)}>X</StyledCancelIcon>
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

const StyledCancelIcon = styled.span`
  cursor: pointer;
  margin-left: 2px;
`;

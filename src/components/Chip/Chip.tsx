import React, { ReactNode } from "react";
import styled from "styled-components";

type Status = "basic" | "active" | "danger" | "warning";
type Variants = "pill" | "rounded";

export interface ChipProps {
  status: Status;
  adornments?: ReactNode;
  label?: string;
  variants?: Variants;
  onDelete?: (label: string) => void;
}

const Chip = ({
  adornments = "#",
  label = "Chip",
  status = "basic",
  variants = "pill",
  onDelete,
}: ChipProps) => {
  const props = { status, variants };

  return (
    <StyledChip {...props}>
      {adornments}
      <StyledChipLabel status={status}>{label}</StyledChipLabel>
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

  border: ${({ status, theme }) =>
    status === "basic" ? `1px solid ${theme.colors.general["300"]}` : "none"};

  color: ${({ status, theme }) =>
    status === "basic" ? theme.colors.general["600"] : "#FFF"};

  background: ${({ status, theme }) => {
    switch (status) {
      case "active":
        return theme.colors.primary["500"];
      case "danger":
        return theme.colors.danger["500"];
      case "warning":
        return theme.colors.warning["500"];
      default:
        return "#fff";
    }
  }};

  gap: 2px;
`;

const StyledChipLabel = styled.span<ChipProps>`
  ${({ theme }) => theme.typography.sm};

  color: ${({ status, theme }) =>
    status === "basic" ? theme.colors.general["600"] : "#FFF"};
`;

const StyledCancelIcon = styled.span`
  cursor: pointer;
  margin-left: 2px;
`;

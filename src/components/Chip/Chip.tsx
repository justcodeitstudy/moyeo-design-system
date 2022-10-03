import React, { ReactNode } from "react";
import styled from "styled-components";

type Status = "basic" | "active" | "danger" | "warning";

export interface ChipProps {
  tag?: ReactNode;
  label?: string;
  status: Status;
  isRounded?: boolean;
  onDelete?: (label: string) => void;
}

const getBackgroundColor = (status: Status) => {
  // TODO: Global Color 로 변경
  const background = {
    basic: "#FFF",
    active: "#06CBF7",
    danger: "#FF3D3D",
    warning: "#F8B200",
  };

  return background[status];
};

const Chip = ({
  tag = "#",
  label = "Chip",
  status = "basic",
  isRounded,
  onDelete,
}: ChipProps) => {
  const props = { status, isRounded };

  return (
    <StyledChip {...props}>
      {tag}
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
  justify-content: space-between;

  height: 26px;

  padding: 0 10px;

  font-size: 16px;

  border-radius: ${({ isRounded }) => (isRounded ? "6px" : "13px")};

  border: ${({ status }) =>
    status !== "basic" ? "none" : "1px solid #dfdfdf"};
  color: ${({ status }) => (status !== "basic" ? "#fff" : "#999")};
  background: ${({ status }) => getBackgroundColor(status)};

  gap: 2px;
`;

const StyledChipLabel = styled.span<ChipProps>`
  font-size: 14px;
  line-height: 22px;

  color: ${({ status }) => (status !== "basic" ? "#fff" : "#999")};
`;

const StyledCancelIcon = styled.span`
  cursor: pointer;
  margin-left: 2px;
`;

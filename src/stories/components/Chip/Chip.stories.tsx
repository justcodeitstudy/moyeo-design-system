import { Meta, Story } from "@storybook/react";
import React from "react";
import { Chip, ChipProps } from "../../../components/Chip";
import styled from "styled-components";

export default {
  title: "Components/Chip",
  component: Chip,
} as Meta;

const onDeleteHandler = (label: string) => {
  alert("Click Label Name: " + label);
};

const ChipItem: ChipProps[] = [
  {
    status: "basic",
    label: "basic",
  },
  {
    status: "active",
    label: "active",
    onDelete: onDeleteHandler,
  },
  {
    status: "danger",
    label: "danger",
  },
  {
    status: "warning",
    label: "warning",
    onDelete: onDeleteHandler,
  },
];

export const Basic: Story<ChipProps> = () => {
  return (
    <>
      <Wrapper>
        {ChipItem.map((props, index) => (
          <Chip key={index} {...props} />
        ))}
      </Wrapper>
      <Wrapper>
        {ChipItem.map((props, index) => (
          <Chip key={index} {...props} isRounded />
        ))}
      </Wrapper>
    </>
  );
};
Basic.parameters = { controls: { disable: true } };

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
  gap: 10px;
`;

export const PlayGround: Story<ChipProps> = (args) => <Chip {...args} />;
PlayGround.args = {
  status: "basic",
};

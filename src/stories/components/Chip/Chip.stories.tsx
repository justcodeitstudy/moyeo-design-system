import { Meta, Story } from "@storybook/react";
import React from "react";
import { Chip, ChipProps } from "../../../components/Chip";
import { CancelIcon } from "../../../Icon/svg";

export default {
  title: "Components/Chip",
  component: Chip,
} as Meta;

export const Default: Story<ChipProps> = (args) => {
  return <Chip {...args} />;
};

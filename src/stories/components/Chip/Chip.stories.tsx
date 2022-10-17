import { Meta, Story } from "@storybook/react";
import { Icon } from "components/Icon";
import React from "react";
import { Chip, ChipProps } from "../../../components/Chip";

export default {
  title: "Components/Chip",
  component: Chip,
} as Meta;

export const Default: Story<ChipProps> = (args) => {
  return <Chip {...args} deleteIcon={<Icon name="cancel" size={12} />} />;
};

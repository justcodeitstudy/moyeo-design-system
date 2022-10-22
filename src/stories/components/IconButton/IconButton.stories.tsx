import { Meta, Story } from "@storybook/react";
import React from "react";
import { IconButton, IconButtonProps } from "components/IconButton";

export default {
  title: "Components/IconButton",
  component: IconButton,
} as Meta;

const Template: Story<IconButtonProps> = (args) => <IconButton {...args} />;

export const Default: Story<IconButtonProps> = (args) => <Template {...args} />;

Default.args = {
  icon: "checkWithCircle",
};

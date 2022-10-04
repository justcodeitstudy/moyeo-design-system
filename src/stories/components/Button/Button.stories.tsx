import { Meta, Story } from "@storybook/react";
import React from "react";
import { Button, ButtonProps } from "../../../components/Button";

export default {
  title: "Components/Button",
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args}>버튼</Button>;

export const Default: Story<ButtonProps> = (args) => <Template {...args} />;

Default.args = {
  variants: "filled",
};

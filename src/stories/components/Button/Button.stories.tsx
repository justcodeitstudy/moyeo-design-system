import { Meta, Story } from "@storybook/react";
import React from "react";
import Button, { ButtonProps } from "../../../components/Button";
import { parameters } from "../../defaultMetaParams";

export default {
  title: "Components/Button",
  component: Button,
  parameters,
} as Meta;

const Template: Story<ButtonProps> = (args: ButtonProps) => (
  <Button {...args}>버튼</Button>
);

export const Basic: Story<ButtonProps> = (args: ButtonProps) => (
  <Template {...args} />
);
Basic.args = {
  size: "medium",
  status: "basic",
};

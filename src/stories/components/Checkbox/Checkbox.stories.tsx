import React from "react";
import { Meta, Story } from "@storybook/react";
import Checkbox, { CheckboxProps } from "../../../components/Checkbox";

export default {
  title: "Components/Checkbox",
  component: Checkbox,
  argTypes: {
    onChange: { action: "changed" },
  },
} as Meta;

export const Medium: Story<CheckboxProps> = (args) => <Checkbox {...args} />;
Medium.args = {
  boxsize: "medium",
};

export const Large: Story<CheckboxProps> = (args) => <Checkbox {...args} />;
Large.args = {
  boxsize: "large",
};

export const Small: Story<CheckboxProps> = (args) => <Checkbox {...args} />;
Small.args = {
  boxsize: "small",
};

export const Disabled: Story<CheckboxProps> = (args) => <Checkbox {...args} />;
Disabled.args = {
  boxsize: "medium",
  checked: true,
  disabled: true,
};

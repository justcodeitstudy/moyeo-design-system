import { Meta, Story } from "@storybook/react";
import React from "react";
import { Icon, IconProps } from "../../../components/Icon";

export default {
  title: "Components/Icon",
  component: Icon,
} as Meta;

export const Default: Story<IconProps> = (props) => {
  return <Icon {...props} />;
};

Default.args = {
  name: "add",
  size: 24,
};

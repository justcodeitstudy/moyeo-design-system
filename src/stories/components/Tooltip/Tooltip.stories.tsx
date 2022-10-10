import { Meta, Story } from "@storybook/react";
import React from "react";
import Tooltip, { TooltipProps } from "../../../components/Tooltip";

export default {
  title: "Components/Tooltip",
  component: Tooltip,
} as Meta;

const Template: Story<TooltipProps> = (args) => <Tooltip {...args} />;

export const Basic: Story<TooltipProps> = (args) => <Template {...args} />;

Basic.args = {
  children: <button style={{ padding: "4px 24px" }}>트리거</button>,
  content: "Tooltip 툴팁",
  position: "bottom",
};

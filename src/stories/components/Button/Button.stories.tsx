import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from "../../../components";

export default {
  title: "Components/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = { label: "Primary", backgroundColor: "#12D4FF" };

export const Secondary = Template.bind({});
Secondary.args = { label: "Secondary", backgroundColor: "red" };

export const Tertiary = Template.bind({});
Tertiary.args = { label: "Tertiary" };

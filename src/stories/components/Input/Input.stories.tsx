import { Meta, Story } from "@storybook/react";
import React, { useState } from "react";
import { Input, InputProps } from "../../../components/Input";

export default {
  title: "Components/Input",
  component: Input,
  argTypes: {
    width: {
      control: {
        type: "range",
        min: 10,
        max: 100,
        step: 1,
      },
    },
  },
} as Meta;

const Template: Story<InputProps> = (args) => {
  const [value, setValue] = useState("");
  return (
    <Input
      {...args}
      label={args.label}
      placeholder={args.placeholder}
      message={args.message}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};

export const Default = Template.bind({});

Default.args = {
  label: "First name 성을 입력~",
  placeholder: "placeholder",
  message: "Max 100 characters 최대 100자",
};

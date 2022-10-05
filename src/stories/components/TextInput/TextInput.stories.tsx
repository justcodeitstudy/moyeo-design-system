import { Meta, Story } from "@storybook/react";
import React, { useState } from "react";
import { TextInput, TextInputProps } from "../../../components/TextInput";

export default {
  title: "Components/TextInput",
  component: TextInput,
  argTypes: {},
} as Meta;

const Template: Story<TextInputProps> = (args) => {
  const [value, setValue] = useState("");
  return (
    <TextInput
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
  width: "300px",
};

import { Story } from "@storybook/react";
import React, { useState } from "react";
import {
  Select as SelectBase,
  SelectProps,
} from "../../../components/Select/Select";

export default {
  title: "components/Select",
  component: SelectBase,
  argTypes: {
    value: {
      table: {
        disable: true,
      },
    },
  },
};
const { Option } = SelectBase;

const month = [
  {
    value: "1",
    label: "1개월",
  },
  {
    value: "2",
    label: "2개월",
  },
  {
    value: "3",
    label: "3개월",
  },
  {
    value: "4",
    label: "4개월",
  },
  {
    value: "5",
    label: "5개월",
  },
];

const Template: Story<SelectProps> = () => <Select />;

export const Default = Template.bind({});

const Select = () => {
  const [value, setValue] = useState("");

  const handleSelectChange = (value: string) => {
    setValue(value);
  };
  return (
    <SelectBase
      label="모집 구분"
      value={value}
      onSelect={handleSelectChange}
      placeholder="선택해주세요."
    >
      {month.map(({ value, label }) => (
        <Option key={value} value={value}>
          {label}
        </Option>
      ))}
    </SelectBase>
  );
};

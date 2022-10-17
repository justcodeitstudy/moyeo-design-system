import { Meta, Story } from "@storybook/react";
import React, { useCallback, useState } from "react";
import { Switch, SwitchProps } from "../../../components/Switch";

export default {
  title: "Components/Switch",
  component: Switch,
} as Meta;

const Template: Story<SwitchProps> = (args) => {
  const [checked, setChecked] = useState(args.checked);

  const handleChange = useCallback(
    (value: boolean) => {
      setChecked(value);
    },
    [setChecked],
  );

  return <Switch {...args} checked={checked} onChange={handleChange} />;
};

export const Basic = Template.bind({});

Basic.args = {
  id: "switch",
  checked: true,
  label: {
    on: "모집중만 볼래요",
    off: "전체를 볼래요",
  },
  align: "right",
  size: "medium",
  variant: "default",
};

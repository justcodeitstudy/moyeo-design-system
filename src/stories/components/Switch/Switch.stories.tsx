import { Meta, Story } from "@storybook/react";
import React, { useCallback, useState } from "react";
import Switch, { SwitchProps } from "../../../components/Switch";

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
  checked: true,
  id: "switch",
  label: "label",
  labelAlign: "right",
  size: "medium",
  variant: "default",
};

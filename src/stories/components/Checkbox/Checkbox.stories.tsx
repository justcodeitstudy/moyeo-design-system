import React, { useCallback, useState } from "react";
import { Meta, Story } from "@storybook/react";
import { Checkbox, CheckboxProps } from "components/Checkbox";

export default {
  title: "Components/Checkbox",
  component: Checkbox,
} as Meta;

export const Default: Story<CheckboxProps> = (args) => {
  const [checked, setChecked] = useState(false);

  const onCheckHandler = useCallback(() => {
    setChecked((checked) => !checked);
  }, []);

  return <Checkbox {...args} checked={checked} onChange={onCheckHandler} />;
};

Default.argTypes = {
  label: {
    control: "text",
    defaultValue: "Label",
  },
  boxsize: {
    control: "radio",
    options: ["medium", "large", "small"],
  },
  checked: {
    control: "boolean",
  },
  disabled: {
    control: "boolean",
  },
};

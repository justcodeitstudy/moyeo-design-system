import React, { Fragment, useCallback, useState } from "react";
import { Meta, Story } from "@storybook/react";
import { Checkbox, CheckboxProps } from "../../../components/Checkbox";

export default {
  title: "Components/Checkbox",
  component: Checkbox,
} as Meta;

export const Medium: Story<CheckboxProps> = () => {
  const [checked, setChecked] = useState(false);

  const onCheckHandler = useCallback(() => {
    setChecked((checked) => !checked);
  }, []);

  return (
    <Fragment>
      <Checkbox checked={checked} onChange={onCheckHandler} />
      <Checkbox checked />
      <Checkbox disabled />
      <Checkbox checked disabled />
    </Fragment>
  );
};
Medium.parameters = {
  controls: { disable: true },
};

export const PlayGround: Story<CheckboxProps> = (args) => (
  <Checkbox {...args} />
);

PlayGround.argTypes = {
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

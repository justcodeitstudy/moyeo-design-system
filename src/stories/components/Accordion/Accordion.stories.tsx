import { Meta, Story } from "@storybook/react";
import React from "react";
import { Accordion, AccordionProps } from "../../../components/Accordion";

export default {
  title: "Components/Accordion",
  component: Accordion,
} as Meta;

const Template: Story<AccordionProps> = (args) => {
  return (
    <>
      <Accordion {...args}>
        <Accordion.Title>Accordion 01</Accordion.Title>
        <Accordion.Content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Content>
      </Accordion>
    </>
  );
};

export const Default = Template.bind({});

Default.args = {
  isExpanded: false,
  align: "left",
};

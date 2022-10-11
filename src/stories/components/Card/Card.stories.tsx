import { Meta, Story } from "@storybook/react";
import React from "react";
import { Card, CardProps } from "components/Card";

export default {
  title: "Components/Card",
  component: Card,
} as Meta;

export const Template: Story<CardProps> = (args) => (
  <Card {...args}>
    <Card.Content>Card Content</Card.Content>
    <Card.Action>
      <hr />
      <button>Card Action</button>
    </Card.Action>
  </Card>
);

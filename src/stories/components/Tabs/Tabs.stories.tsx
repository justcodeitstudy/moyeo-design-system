import { Meta, Story } from "@storybook/react";
import React, { useCallback, useState } from "react";
import { Tabs } from "../../../components/Tabs";

export default {
  title: "Components/Tab",
  component: Tabs.Item,
} as Meta;

const items = [
  { label: "인기", value: "popular" },
  { label: "프론트엔드", value: "frontend" },
  { label: "백엔드", value: "backend" },
  { label: "디자인", value: "design" },
  { label: "기획", value: "plan" },
];

export const Template: Story = () => {
  const [selected, setSelected] = useState("popular");

  const handleSelect = useCallback(
    (value: string) => {
      setSelected(value);
    },
    [setSelected],
  );

  return (
    <Tabs>
      {items.map(({ label, value }, index) => (
        <Tabs.Item
          key={index}
          value={value}
          selected={selected === value}
          onTabSelect={handleSelect}
        >
          {label}
        </Tabs.Item>
      ))}
    </Tabs>
  );
};

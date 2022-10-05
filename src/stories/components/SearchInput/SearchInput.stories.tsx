import { Meta, Story } from "@storybook/react";
import {
  SearchInput as SearchInputBase,
  SearchInputProps,
} from "../../../components/SearchInput";
import React from "react";

export default {
  title: "Components/SearchInput",
  component: SearchInputBase,
  argTypes: {},
} as Meta;

const Template: Story<SearchInputProps> = (args) => {
  const handleSearch = (value: string) => {
    console.log(`input value : ${value}`);
  };
  return <SearchInputBase {...args} onSearch={handleSearch} />;
};

export const Default = Template.bind({});

Default.args = {
  placeholder: "프로젝트 검색",
};

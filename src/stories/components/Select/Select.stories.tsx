import { Story } from "@storybook/react";
import React, { useState } from "react";
import { Select as SelectBase, SelectProps } from "components/Select/Select";
import { Chip } from "components/Chip";

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

export const MultiSelect = () => {
  const [optionValues, setOptionValues] = useState<string[]>([]);
  const [optionList, setOptionList] = useState(month);

  const handleSelectChange = (value: string) => {
    const isIncludeValue = optionValues.includes(value);

    if (isIncludeValue) {
      return setOptionValues(optionValues.filter((x) => x !== value));
    }

    setOptionValues(optionValues.concat(value));
  };

  const handleSelectClose = () => {
    setOptionList(month);
  };

  const handleDelete = (
    e: React.MouseEvent<HTMLDivElement>,
    label?: string,
  ) => {
    const value = month?.find((month) => month.label === label)?.value;

    setOptionValues(optionValues.filter((x) => x !== value));
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value?.trim();

    if (!inputValue) {
      return setOptionList(month);
    }

    setOptionList(month.filter(({ label }) => label.includes(inputValue)));
  };

  return (
    <SelectBase
      isMulti
      value={optionValues}
      onSelect={handleSelectChange}
      onChange={setOptionValues}
      onClose={handleSelectClose}
      placeholder="태그를 입력해주세요."
      onSearchInputChange={handleSearchInputChange}
      renderInput={(selected) =>
        selected.map((value) => (
          <Chip
            color="active"
            variants="pill"
            key={value}
            onDelete={handleDelete}
            label={month.find((month) => month.value === value)?.label}
          />
        ))
      }
    >
      {optionList.length === 0 && <span>검색된 태그가 없습니다.</span>}
      {optionList.map(({ value, label }) => (
        <Option key={value} value={value}>
          {label}
        </Option>
      ))}
    </SelectBase>
  );
};

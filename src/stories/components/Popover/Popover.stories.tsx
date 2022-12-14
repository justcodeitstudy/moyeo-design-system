import { Popover as PopoverBase } from "../../../components/Popover";
import { Story } from "@storybook/react/types-6-0";
import React, { useCallback, useState } from "react";
import styled from "styled-components";

export default {
  title: "components/Popover",
  component: PopoverBase,
  argTypes: {},
};

const Popover = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <PopoverBase
      anchorPosition={{
        x: 0,
        y: 8,
      }}
      isOpen={isOpen}
      onClose={toggleOpen}
      opener={<button onClick={toggleOpen}>프로필 드롭다운</button>}
    >
      <Ul>
        <Li>마이페이지</Li>
        <Li>로그아웃</Li>
      </Ul>
    </PopoverBase>
  );
};

const Template: Story = (args) => <Popover {...args} />;

export const Default = Template.bind({});

const Ul = styled("ul")`
  max-height: 90px;
  overflow: scroll;
  padding: 6px;
`;

const Li = styled("li")`
  display: flex;
  align-items: center;
  list-style: none;
  height: 24px;
  border-radius: 6px;
  padding: 8px 12px;
  vertical-align: center;
  font-size: ${({ theme }) => theme.typography.md};
  color: ${({ theme }) => theme.colors.black[300]};
  font-weight: 300;
  cursor: pointer;

  &:hover {
    ${({ theme }) => theme.typography.header4};
    background-color: ${({ theme }) => theme.colors.primary[50]};
    color: ${({ theme }) => theme.colors.black[400]};
  }
`;

import { Meta, Story } from "@storybook/react";
import React from "react";
import { Button, ButtonProps } from "components/Button";
import { Icon } from "components/Icon";
import styled from "styled-components";

export default {
  title: "Components/Button",
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args}>버튼</Button>;

export const Default: Story<ButtonProps> = (args) => <Template {...args} />;

Default.args = {};

export const WithIcon = () => {
  return (
    <Container>
      <Button endIcon={<Icon name="write" size={24} />}>
        모집 글 작성하기
      </Button>
      <Button startIcon={<Icon name="write" />}>모집 글 작성하기</Button>
    </Container>
  );
};

const Container = styled("div")`
  display: flex;

  button {
    margin-right: 4px;
  }
`;

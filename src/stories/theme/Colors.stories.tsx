import React from "react";
import styled from "styled-components";
import { Meta, Story } from "@storybook/react";
import { Theme } from "styles/theme";

export default {
  title: "Theme/Colors",
} as Meta;

const hexToRgb = (hex: string) => {
  const slicedHex = hex.slice(1, 7);
  const bigint = parseInt(slicedHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `${r}, ${g}, ${b}`;
};

const generatePalette = (entries: [string, string][], name: string) => {
  return (
    <>
      <Row>
        <Column width="300px">Color</Column>
        <Column>Naming</Column>
        <Column>Hex</Column>
        <Column>RGB</Column>
      </Row>
      <Divider />
      {entries.map(([naming, hex]) => {
        return (
          <Row key={hex}>
            <ColorColumn color={hex.toLowerCase()} />
            <Column>{`${name}${naming}`}</Column>
            <Column>{hex.toUpperCase()}</Column>
            <Column>{hexToRgb(hex)}</Column>
          </Row>
        );
      })}
    </>
  );
};

export const Colors: Story = () => {
  const primary = Object.entries(Theme.colors.primary);
  const success = Object.entries(Theme.colors.success);
  const danger = Object.entries(Theme.colors.danger);
  const warning = Object.entries(Theme.colors.warning);
  const black = Object.entries(Theme.colors.black);
  const general = Object.entries(Theme.colors.general);
  const text = Object.entries(Theme.colors.text);

  return (
    <>
      <Title>Primary</Title>
      {generatePalette(primary, "Primary")}
      <Title>Success</Title>
      {generatePalette(success, "Success")}
      <Title>Danger</Title>
      {generatePalette(danger, "Danger")}
      <Title>Warning</Title>
      {generatePalette(warning, "Warning")}
      <Title>Black</Title>
      {generatePalette(black, "Black")}
      <Title>General</Title>
      {generatePalette(general, "General")}
      <Title>Text</Title>
      {generatePalette(text, "Text")}
    </>
  );
};

const Title = styled.h1`
  margin-top: 32px;
  margin-bottom: 8px;
  ${Theme.typography.header1};
`;

const Divider = styled.div`
  margin: 8px 0;
  width: 100%;
  height: 1px;
  background-color: ${Theme.colors.general[300]};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
`;

const Column = styled.div<{ width?: string }>`
  width: ${({ width }) => (width ? width : "100px")};
  ${Theme.typography.md};
`;

const ColorColumn = styled.div<{ color: string }>`
  width: 300px;
  height: 50px;
  background-color: ${({ color }) => color};
`;

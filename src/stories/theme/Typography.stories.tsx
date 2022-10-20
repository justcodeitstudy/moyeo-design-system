import React from "react";
import styled from "styled-components";
import { Meta, Story } from "@storybook/react";
import { Theme } from "styles/theme";

export default {
  title: "Theme/Typography",
} as Meta;

type FontProps = "font-size" | "font-weight" | "line-height";

type Font = {
  [key in FontProps]: string;
};

const generateTypography = (typography: string, font: Font) => {
  return (
    <>
      <Row key={typography}>
        <FontColumn width="120px" font={font}>
          {typography}
        </FontColumn>
        <FontColumn width="400px" font={font}>
          다람쥐 헌 쳇바퀴에 타고파
        </FontColumn>
        <Column>{font["font-size"]}</Column>
        <Column>{font["font-weight"]}</Column>
        <Column>{font["line-height"]}</Column>
      </Row>
      <TypographyDivider />
    </>
  );
};

export const Typography: Story = () => {
  const typographys = Object.entries(Theme.typography);

  return (
    <>
      <Title>Pretendard</Title>
      <Row>
        <Column width="120px">Type</Column>
        <Column width="400px">Sample</Column>
        <Column>Size</Column>
        <Column>Weight</Column>
        <Column>Line</Column>
      </Row>
      <TitleDivider />
      {typographys.map(([typography, font]) =>
        generateTypography(typography, font),
      )}
    </>
  );
};

const Title = styled.h1`
  margin-bottom: 30px;
  ${Theme.typography.header1};
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${Theme.colors.general[300]};
`;

const TitleDivider = styled(Divider)`
  margin-top: 8px;
  margin-bottom: 30px;
`;

const TypographyDivider = styled(Divider)`
  margin: 30px 0;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
`;

const Column = styled.div<{ width?: string }>`
  width: ${({ width }) => (width ? width : "50px")};
  ${Theme.typography.md};
`;

const FontColumn = styled.div<{ font: Font; width?: string }>`
  width: ${({ width }) => width || "auto"};
  font-size: ${({ font }) => font["font-size"]};
  font-weight: ${({ font }) => font["font-weight"]};
  line-height: ${({ font }) => font["line-height"]};
`;

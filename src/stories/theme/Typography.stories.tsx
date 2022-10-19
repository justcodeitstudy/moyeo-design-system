import React from "react";
import styled from "styled-components";
import { Meta, Story } from "@storybook/react";
import { Theme } from "styles/theme";

export default {
  title: "Theme/Typography",
} as Meta;

interface Font {
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
}

const generateTypography = (typography: string, font: Font) => {
  const { fontSize, fontWeight, lineHeight } = font;
  return (
    <>
      <Row key={typography}>
        <FontColumn
          style={{ width: "120px" }}
          fontSize={fontSize}
          fontWeight={fontWeight}
          lineHeight={lineHeight}
        >
          {typography.toUpperCase()}
        </FontColumn>
        <FontColumn
          style={{ width: "400px" }}
          fontSize={fontSize}
          fontWeight={fontWeight}
          lineHeight={lineHeight}
        >
          다람쥐 헌 쳇바퀴에 타고파
        </FontColumn>
        <Column>{fontSize}</Column>
        <Column>{fontWeight}</Column>
        <Column>{lineHeight}</Column>
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
        <Column style={{ width: "120px" }}>Type</Column>
        <Column style={{ width: "400px" }}>Sample</Column>
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

const Column = styled.div`
  width: 50px;
  ${Theme.typography.md};
`;

const FontColumn = styled.div<Font>`
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  line-height: ${({ lineHeight }) => lineHeight};
`;

import { css, FlattenSimpleInterpolation } from "styled-components";

const header1: FlattenSimpleInterpolation = css`
  font-size: 32px;
  font-weight: 700;
  line-height: 40px;
`;

const header2: FlattenSimpleInterpolation = css`
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
`;

const header3: FlattenSimpleInterpolation = css`
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
`;

const header4: FlattenSimpleInterpolation = css`
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
`;

const lg: FlattenSimpleInterpolation = css`
  font-size: 20px;
  font-weight: 400;
  line-height: 28px;
`;

const md: FlattenSimpleInterpolation = css`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`;

const sm: FlattenSimpleInterpolation = css`
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
`;

const xs: FlattenSimpleInterpolation = css`
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
`;

const typography = {
  header1,
  header2,
  header3,
  header4,
  lg,
  md,
  sm,
  xs,
};

export default typography;

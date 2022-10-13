import { css } from "styled-components";

export const inputStyle = {
  default: css`
    border: 1px solid ${({ theme }) => theme.colors.general[300]};
  `,
  danger: css`
    border: 1px solid ${({ theme }) => theme.colors.danger[600]};
  `,
  warning: css`
    border: 1px solid ${({ theme }) => theme.colors.warning[500]};
  `,
};

export const descriptionStyle = {
  default: css`
    color: ${({ theme }) => theme.colors.text.secondary};
  `,
  danger: css`
    color: ${({ theme }) => theme.colors.danger[600]};
  `,
  warning: css`
    color: ${({ theme }) => theme.colors.warning[500]};
  `,
};

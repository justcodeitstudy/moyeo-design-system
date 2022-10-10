import { css } from "styled-components";

export default {
  colors: {
    primary: css`
      --main-color: ${({ theme }) => theme.colors.primary[500]};
      --active-color: ${({ theme }) => theme.colors.primary[600]};
      --text-hover-background-color: ${({ theme }) => theme.colors.general[50]};
      --text-active-background-color: #fff;
      --text-color: ${({ theme }) => theme.colors.primary[500]};
      --outlined-active-color: ${({ theme }) => theme.colors.primary[600]};
    `,
    general: css`
      --main-color: ${({ theme }) => theme.colors.general[400]};
      --active-color: ${({ theme }) => theme.colors.general[500]};
      --text-hover-background-color: ${({ theme }) => theme.colors.general[50]};
      --text-active-background-color: ${({ theme }) =>
        theme.colors.primary[100]};
      --text-color: ${({ theme }) => theme.colors.black[400]};
      --outlined-active-color: ${({ theme }) => theme.colors.general[700]};
    `,
    success: css`
      --main-color: ${({ theme }) => theme.colors.success[500]};
      --active-color: ${({ theme }) => theme.colors.success[600]};
      --text-hover-background-color: ${({ theme }) => theme.colors.general[50]};
      --text-active-background-color: #fff;
      --text-color: ${({ theme }) => theme.colors.success[500]};
      --outlined-active-color: ${({ theme }) => theme.colors.success[600]};
    `,
    danger: css`
      --main-color: ${({ theme }) => theme.colors.danger[500]};
      --active-color: ${({ theme }) => theme.colors.danger[600]};
      --text-hover-background-color: ${({ theme }) => theme.colors.general[50]};
      --text-active-background-color: #fff;
      --text-color: ${({ theme }) => theme.colors.danger[500]};
      --outlined-active-color: ${({ theme }) => theme.colors.danger[600]};
    `,
    warning: css`
      --main-color: ${({ theme }) => theme.colors.warning[500]};
      --active-color: ${({ theme }) => theme.colors.warning[600]};
      --text-hover-background-color: ${({ theme }) => theme.colors.general[50]};
      --text-active-background-color: #fff;
      --text-color: ${({ theme }) => theme.colors.warning[500]};
      --outlined-active-color: ${({ theme }) => theme.colors.warning[600]};
    `,
  },
  variants: {
    filled: css`
      background-color: var(--main-color);
      color: #fff;

      &:hover {
        box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.1);
      }
      &:active {
        background-color: var(--active-color);
      }
    `,
    outlined: css`
      color: var(--main-color);
      background-color: #fff;
      outline: 1px solid var(--main-color);
      outline-offset: -1px;

      &:hover {
        box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.1);
      }
      &:active {
        outline: 1px solid var(--outlined-active-color);
        color: var(--outlined-active-color);
      }
    `,
    text: css`
      color: var(--main-color);
      border: none;
      background: transparent;

      &:hover {
        color: var(--text-color);
        background-color: var(--text-hover-background-color);
      }
      &:active {
        color: var(--text-color);
        background-color: var(--text-active-background-color);
      }
    `,
  },
};

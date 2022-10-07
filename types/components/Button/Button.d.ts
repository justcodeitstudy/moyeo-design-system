import React, { ButtonHTMLAttributes } from "react";
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size?: Size;
    status?: Status;
    disabled?: boolean;
    onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}
declare type Size = "medium" | "large";
declare type Status = "primary" | "secondary" | "basic" | "danger";
declare const Button: ({ size, status, disabled, onClick, children, ...rest }: ButtonProps) => JSX.Element;
export default Button;

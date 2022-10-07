import React, { InputHTMLAttributes } from "react";
export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    message?: React.ReactNode;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export declare const TextInput: React.ForwardRefExoticComponent<TextInputProps & React.RefAttributes<HTMLInputElement>>;

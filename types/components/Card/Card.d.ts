import React from "react";
export declare type CardProps = React.HTMLAttributes<HTMLDivElement>;
export declare const Card: {
    ({ children, ...rest }: CardProps): JSX.Element;
    Content: ({ children, ...rest }: {
        children: React.ReactNode;
    }) => JSX.Element;
    Action: ({ children, ...rest }: {
        children: React.ReactNode;
    }) => JSX.Element;
};

export const isMobile =
  typeof window === "undefined"
    ? false
    : window.matchMedia(
        //  TODO breakpoint
        `only screen and (max-width: 500px)`,
      ).matches;

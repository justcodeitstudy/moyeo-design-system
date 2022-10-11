export type VerticalAnchorOrigin = "top" | "center" | "bottom";
export type HorizontalAnchorOrigin = "left" | "center" | "right";
type AnchorOrigin = VerticalAnchorOrigin | HorizontalAnchorOrigin;

interface AnchorCoordProps {
  anchorRect: DOMRect;
  contentRect: DOMRect;
  anchorOrigin: OriginProps;
  transformOrigin: OriginProps;
  anchorPosition: {
    x: number;
    y: number;
  };
}

interface OriginProps {
  vertical: VerticalAnchorOrigin;
  horizontal: HorizontalAnchorOrigin;
}

const getPosition = (base: number, extra: number, origin: AnchorOrigin) => {
  switch (origin) {
    case "left":
    case "top":
      return base;
    case "right":
    case "bottom":
      return base + extra;
    case "center":
      return base + extra / 2;
  }
};

export const calcAnchorCoord = ({
  anchorRect,
  contentRect,
  anchorOrigin,
  transformOrigin,
  anchorPosition,
}: AnchorCoordProps) => {
  const x = getPosition(
    anchorRect.left,
    anchorRect.width,
    anchorOrigin.horizontal,
  );
  const y = getPosition(
    anchorRect.top,
    anchorRect.height,
    anchorOrigin.vertical,
  );
  const transformXPosition = getPosition(
    0,
    contentRect.width,
    transformOrigin.horizontal,
  );
  const transformYPosition = getPosition(
    0,
    contentRect.height,
    transformOrigin.vertical,
  );

  return {
    x: x + anchorPosition.x - transformXPosition + window.scrollX,
    y: y + anchorPosition.y - transformYPosition + window.scrollY,
  };
};

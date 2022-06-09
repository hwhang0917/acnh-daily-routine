import { css } from "@emotion/react";
import { useCallback, useState } from "react";
import { generateRandomInteger } from "utils";

interface IBorderRadius {
  first: number[];
  second: number[];
}

const Blob = () => {
  const [borderRadius, setBorderRadius] = useState<IBorderRadius>({
    first: Array.from({ length: 4 }, () => generateRandomInteger(20, 80)),
    second: Array.from({ length: 4 }, () => generateRandomInteger(20, 80)),
  });

  const getPercentString = useCallback(
    (numArr: number[]): string => numArr.join("% ").concat("%"),
    []
  );

  return (
    <div
      css={css`
        width: 500px;
        height: 500px;
        border-radius: ${getPercentString(borderRadius.first)} /
          ${getPercentString(borderRadius.second)};
        background: rgba(236, 240, 241, 0.8);
      `}
    ></div>
  );
};

export default Blob;

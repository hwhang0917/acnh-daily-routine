import { css } from "@emotion/react";

const Header = () => {
  return (
    <header
      css={css`
        position: fixed;
        top: 0;
        height: 100px;
        width: 100%;
        background-color: black;
      `}
    ></header>
  );
};

export default Header;

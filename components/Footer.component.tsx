import { css } from "@emotion/react";

const Footer = () => {
  return (
    <footer
      css={css`
        position: fixed;
        bottom: 0;
        height: 100px;
        width: 100%;
        background-color: black;
      `}
    ></footer>
  );
};

export default Footer;

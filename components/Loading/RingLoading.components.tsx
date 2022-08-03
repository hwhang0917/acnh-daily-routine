import styled from "styled-components";

interface IProps {
  color?: string;
}

export const RingLoading = ({ color }: IProps) => {
  return (
    <LoadingWrapper aria-label="loading logo">
      <Ring color={color} />
    </LoadingWrapper>
  );
};

const LoadingWrapper = styled.div``;
const Ring = styled.div<{ color?: string }>`
  display: inline-block;
  width: 80px;
  height: 80px;

  &::after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 6px solid;
    border-radius: 50%;
    border-color: ${({ color }) => color ?? "gray"} transparent
      ${({ color }) => color ?? "gray"} transparent;
    animation: rotate 1.2s infinite linear;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

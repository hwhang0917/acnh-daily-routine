import styled from "styled-components";

interface IProps {
  color?: string;
}

export const RingLoading = ({ color }: IProps) => {
  return (
    <LoadingWrapper aria-label="loading logo">
      <OuterRing color={color}>
        <InnerRing />
      </OuterRing>
    </LoadingWrapper>
  );
};

const LoadingWrapper = styled.div``;
const InnerRing = styled.div`
  width: 23px;
  height: 23px;
  background-color: white;
  border-radius: 50%;
`;
const OuterRing = styled.div<{ color?: string }>`
  width: 25px;
  height: 25px;
  background-color: ${({ color }) => color ?? "gray"};
  border-radius: 50%;

  animation: rotate 1s infinite linear;

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

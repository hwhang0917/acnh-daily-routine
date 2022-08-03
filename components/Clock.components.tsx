interface IProps {
  time: Date;
}

export const Clock = ({ time }: IProps) => {
  return (
    <div>
      <h1>{time.toLocaleTimeString()}</h1>
    </div>
  );
};

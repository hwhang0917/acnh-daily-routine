import React from "react";
import type {
  GetServerSideProps,
  GetServerSidePropsResult,
  NextPage,
} from "next";
import { IMusic } from "@interfaces";
import useTime from "hooks/useTime";

interface IProps {
  hourMusic: IMusic[];
}

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  return {
    props: {
      hourMusic: [],
    },
  };
};

const Home: NextPage<IProps> = ({ hourMusic }) => {
  const date = useTime();

  return (
    <React.Fragment>
      <h1>{date.format("HH:mm:ss")}</h1>
    </React.Fragment>
  );
};

export default Home;

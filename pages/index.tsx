import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Axios from "axios";

const Title = styled.h1`
  font-size: 32px;
`;

const Home = () => {
  const router = useRouter();

  const handleClick = async () => {
    try {
      const { data } = await Axios.post("/api/createRoom");
      router.push("/[roomId]", `/${data._id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Title>Hello</Title>
      <button onClick={handleClick}>create room</button>
    </>
  );
};

export default Home;
